import {
  classifyError,
  extractErrorInfo,
  getStatusCodeForErrorType,
} from "../utils";
import { ErrorType } from "../../types/errors";

describe("Error Utils", () => {
  describe("classifyError", () => {
    it("should classify 404 errors correctly", () => {
      const error = new Error("Not found");
      const result = classifyError(error, 404);
      expect(result).toBe(ErrorType.NOT_FOUND);
    });

    it("should classify server errors correctly", () => {
      const error = new Error("Internal server error");
      const result = classifyError(error, 500);
      expect(result).toBe(ErrorType.SERVER_ERROR);
    });

    it("should classify client errors correctly", () => {
      const error = new Error("Bad request");
      const result = classifyError(error, 400);
      expect(result).toBe(ErrorType.CLIENT_ERROR);
    });

    it("should classify network errors from message", () => {
      const error = new Error("Network connection failed");
      const result = classifyError(error);
      expect(result).toBe(ErrorType.NETWORK_ERROR);
    });

    it("should classify validation errors from message", () => {
      const error = new Error("Validation failed");
      const result = classifyError(error);
      expect(result).toBe(ErrorType.VALIDATION_ERROR);
    });

    it("should default to unknown error", () => {
      const error = new Error("Something unexpected");
      const result = classifyError(error);
      expect(result).toBe(ErrorType.UNKNOWN_ERROR);
    });
  });

  describe("extractErrorInfo", () => {
    it("should extract error information correctly", () => {
      const error = new Error("Test error") as Error & { digest?: string };
      error.digest = "test-digest";

      const result = extractErrorInfo(error);

      expect(result.message).toBe("Test error");
      expect(result.digest).toBe("test-digest");
    });
  });

  describe("getStatusCodeForErrorType", () => {
    it("should return correct status codes for error types", () => {
      expect(getStatusCodeForErrorType(ErrorType.NOT_FOUND)).toBe(404);
      expect(getStatusCodeForErrorType(ErrorType.SERVER_ERROR)).toBe(500);
      expect(getStatusCodeForErrorType(ErrorType.CLIENT_ERROR)).toBe(400);
      expect(getStatusCodeForErrorType(ErrorType.NETWORK_ERROR)).toBe(503);
      expect(getStatusCodeForErrorType(ErrorType.UNKNOWN_ERROR)).toBe(500);
    });
  });
});
