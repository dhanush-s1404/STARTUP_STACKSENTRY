import { ApiError } from "@/services/api";
import { logger } from "@/lib/logger";

export class AppError extends Error {
  code: string;
  statusCode: number;
  isRecoverable: boolean;

  constructor(
    message: string,
    options: {
      code?: string;
      statusCode?: number;
      isRecoverable?: boolean;
      cause?: Error;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.code = options.code || "UNKNOWN_ERROR";
    this.statusCode = options.statusCode || 500;
    this.isRecoverable = options.isRecoverable ?? true;
  }
}

export function handleApiError(error: unknown): {
  message: string;
  code: string;
  isRecoverable: boolean;
} {
  if (error instanceof ApiError) {
    const isNetwork = error.status === 0;
    const isTimeout = error.status === 408;
    const isServerError = error.status >= 500;

    if (isNetwork || isTimeout) {
      return {
        message: "Unable to connect to the server. Please check your connection.",
        code: "NETWORK_ERROR",
        isRecoverable: true,
      };
    }

    if (error.status === 404) {
      return {
        message: "The requested resource was not found.",
        code: "NOT_FOUND",
        isRecoverable: false,
      };
    }

    if (error.status === 403) {
      return {
        message: "You do not have permission to perform this action.",
        code: "FORBIDDEN",
        isRecoverable: false,
      };
    }

    if (error.status === 401) {
      return {
        message: "Your session has expired. Please log in again.",
        code: "UNAUTHORIZED",
        isRecoverable: false,
      };
    }

    if (isServerError) {
      return {
        message: "A server error occurred. Please try again later.",
        code: "SERVER_ERROR",
        isRecoverable: true,
      };
    }

    return {
      message: error.message || "An unexpected error occurred.",
      code: "API_ERROR",
      isRecoverable: false,
    };
  }

  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      isRecoverable: error.isRecoverable,
    };
  }

  if (error instanceof Error) {
    logger.error("Unhandled error", error);
    return {
      message: "An unexpected error occurred.",
      code: "UNKNOWN_ERROR",
      isRecoverable: true,
    };
  }

  return {
    message: "An unknown error occurred.",
    code: "UNKNOWN_ERROR",
    isRecoverable: true,
  };
}

export function createErrorBoundaryHandler(componentName: string) {
  return (error: Error, errorInfo: { componentStack: string }) => {
    logger.error(`Error in ${componentName}`, error, {
      componentStack: errorInfo.componentStack,
    });
  };
}
