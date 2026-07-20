import { describe, it, expect } from "vitest";
import { siteConfig, siteMetadata } from "@/config/site";

describe("siteConfig", () => {
  it("has required fields", () => {
    expect(siteConfig.name).toBe("StackSentry Technologies");
    expect(siteConfig.tagline).toBeTruthy();
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.url).toBeTruthy();
  });

  it("has social links", () => {
    expect(siteConfig.links.twitter).toBeTruthy();
    expect(siteConfig.links.github).toBeTruthy();
    expect(siteConfig.links.linkedin).toBeTruthy();
  });

  it("has company info", () => {
    expect(siteConfig.company.founded).toBeTruthy();
    expect(siteConfig.company.mission).toBeTruthy();
    expect(siteConfig.company.vision).toBeTruthy();
  });
});

describe("siteMetadata", () => {
  it("has title", () => {
    expect(siteMetadata.title).toBeTruthy();
  });

  it("has description", () => {
    expect(siteMetadata.description).toBeTruthy();
  });

  it("has keywords", () => {
    expect(Array.isArray(siteMetadata.keywords)).toBe(true);
    expect(siteMetadata.keywords!.length).toBeGreaterThan(0);
  });
});
