import { describe, it, expect } from "vitest";
import { handleApiError, AppError } from "@/lib/errors";
import { ApiError } from "@/services/api";

describe("Error Handling", () => {
  describe("handleApiError", () => {
    it("handles network errors", () => {
      const error = new ApiError("Network error", 0);
      const result = handleApiError(error);
      expect(result.code).toBe("NETWORK_ERROR");
      expect(result.isRecoverable).toBe(true);
    });

    it("handles 404 errors", () => {
      const error = new ApiError("Not found", 404);
      const result = handleApiError(error);
      expect(result.code).toBe("NOT_FOUND");
      expect(result.isRecoverable).toBe(false);
    });

    it("handles 401 errors", () => {
      const error = new ApiError("Unauthorized", 401);
      const result = handleApiError(error);
      expect(result.code).toBe("UNAUTHORIZED");
      expect(result.isRecoverable).toBe(false);
    });

    it("handles 500 errors", () => {
      const error = new ApiError("Server error", 500);
      const result = handleApiError(error);
      expect(result.code).toBe("SERVER_ERROR");
      expect(result.isRecoverable).toBe(true);
    });

    it("handles AppError", () => {
      const error = new AppError("Custom error", {
        code: "CUSTOM",
        isRecoverable: false,
      });
      const result = handleApiError(error);
      expect(result.code).toBe("CUSTOM");
      expect(result.isRecoverable).toBe(false);
    });

    it("handles unknown errors", () => {
      const result = handleApiError("random string");
      expect(result.code).toBe("UNKNOWN_ERROR");
      expect(result.isRecoverable).toBe(true);
    });

    it("handles timeout errors", () => {
      const error = new ApiError("Request timed out", 408);
      const result = handleApiError(error);
      expect(result.code).toBe("NETWORK_ERROR");
      expect(result.isRecoverable).toBe(true);
    });
  });

  describe("AppError", () => {
    it("creates error with default values", () => {
      const error = new AppError("test");
      expect(error.name).toBe("AppError");
      expect(error.code).toBe("UNKNOWN_ERROR");
      expect(error.statusCode).toBe(500);
      expect(error.isRecoverable).toBe(true);
    });

    it("creates error with custom values", () => {
      const error = new AppError("custom", {
        code: "CUSTOM_CODE",
        statusCode: 400,
        isRecoverable: false,
      });
      expect(error.code).toBe("CUSTOM_CODE");
      expect(error.statusCode).toBe(400);
      expect(error.isRecoverable).toBe(false);
    });
  });
});
