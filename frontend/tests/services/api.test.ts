import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { api, ApiError } from "@/services/api";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("API Client", () => {
  describe("api.get", () => {
    it("makes GET request to correct endpoint", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({ data: "test" }),
      });

      const result = await api.get("/test");
      expect(result).toEqual({ data: "test" });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/test"),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("throws ApiError on non-ok response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: "Not found" }),
      });

      await expect(api.get("/missing")).rejects.toThrow(ApiError);
    });

    it("retries on server errors", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ message: "Server error" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          headers: new Headers({ "content-type": "application/json" }),
          json: async () => ({ data: "recovered" }),
        });

      const result = await api.get("/flaky", undefined);
      expect(result).toEqual({ data: "recovered" });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("does not retry on 4xx errors (except 429)", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ message: "Bad request" }),
      });

      await expect(api.get("/bad")).rejects.toThrow(ApiError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("api.post", () => {
    it("makes POST request with body", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({ id: "1" }),
      });

      const result = await api.post("/create", { name: "test" });
      expect(result).toEqual({ id: "1" });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/create"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ name: "test" }),
        }),
      );
    });
  });

  describe("ApiError", () => {
    it("has correct properties", () => {
      const error = new ApiError("Not found", 404);
      expect(error.name).toBe("ApiError");
      expect(error.message).toBe("Not found");
      expect(error.status).toBe(404);
      expect(error.isNotFound).toBe(true);
      expect(error.isServerError).toBe(false);
    });

    it("detects server errors", () => {
      const error = new ApiError("Server error", 503);
      expect(error.isServerError).toBe(true);
    });

    it("detects network errors", () => {
      const error = new ApiError("Network error", 0);
      expect(error.isNetworkError).toBe(true);
    });
  });
});
