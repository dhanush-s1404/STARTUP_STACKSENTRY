import { describe, it, expect } from "vitest";
import { contactFormSchema, newsletterFormSchema } from "@/lib/validation";

describe("contactFormSchema", () => {
  it("validates correct data", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "This is a test message",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "John",
      email: "invalid",
      subject: "Test",
      message: "Test message",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short name", () => {
    const result = contactFormSchema.safeParse({
      name: "J",
      email: "john@example.com",
      subject: "Test",
      message: "Test message",
    });
    expect(result.success).toBe(false);
  });
});

describe("newsletterFormSchema", () => {
  it("validates correct email", () => {
    const result = newsletterFormSchema.safeParse({ email: "test@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = newsletterFormSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });
});
