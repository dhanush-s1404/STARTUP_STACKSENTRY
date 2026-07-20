import { describe, it, expect } from "vitest";
import { formatDate, formatNumber, slugify, getInitials, capitalize, truncate } from "@/utils";

describe("formatDate", () => {
  it("formats date string correctly", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBeTruthy();
  });

  it("formats Date object correctly", () => {
    const result = formatDate(new Date("2024-01-15"));
    expect(result).toBeTruthy();
  });
});

describe("formatNumber", () => {
  it("formats numbers with commas", () => {
    expect(formatNumber(1000000)).toBe("1,000,000");
  });

  it("formats small numbers", () => {
    expect(formatNumber(42)).toBe("42");
  });
});

describe("slugify", () => {
  it("converts text to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("handles special characters", () => {
    expect(slugify("Hello! @World#")).toBe("hello-world");
  });
});

describe("getInitials", () => {
  it("returns initials from name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("limits to 2 characters", () => {
    expect(getInitials("John Michael Doe")).toBe("JM");
  });
});

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });
});

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
  });

  it("does not truncate short strings", () => {
    expect(truncate("Hi", 5)).toBe("Hi");
  });
});
