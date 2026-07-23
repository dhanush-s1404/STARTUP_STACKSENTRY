const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  retries?: number;
  retryDelay?: number;
  timeout?: number;
};

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isServerError() {
    return this.status >= 500;
  }

  get isNetworkError() {
    return this.status === 0;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
    retries = 2,
    retryDelay = 1000,
    timeout = 30000,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  let combinedSignal: AbortSignal;
  if (signal && typeof AbortSignal.any === "function") {
    combinedSignal = AbortSignal.any([signal, controller.signal]);
  } else if (signal) {
    const combined = new AbortController();
    signal.addEventListener("abort", () => combined.abort(), { once: true });
    controller.signal.addEventListener("abort", () => combined.abort(), { once: true });
    combinedSignal = combined.signal;
  } else {
    combinedSignal = controller.signal;
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    signal: combinedSignal,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "An error occurred" }));
        throw new ApiError(
          errorData.message || errorData.detail || "Request failed",
          response.status,
          errorData,
        );
      }

      clearTimeout(timeoutId);

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json();
      }
      return (await response.text()) as unknown as T;
    } catch (error) {
      lastError = error as Error;

      if (error instanceof ApiError) {
        if (error.status >= 400 && error.status < 500 && error.status !== 429) {
          clearTimeout(timeoutId);
          throw error;
        }
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        clearTimeout(timeoutId);
        throw new ApiError("Request timed out", 408);
      }

      if (attempt < retries) {
        await sleep(retryDelay * Math.pow(2, attempt));
        continue;
      }

      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        lastError?.message || "Network error",
        0,
      );
    }
  }

  throw lastError || new ApiError("Request failed", 0);
}

export const api = {
  get: <T>(endpoint: string, signal?: AbortSignal) =>
    request<T>(endpoint, { signal }),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body }),

  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PUT", body }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PATCH", body }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};
