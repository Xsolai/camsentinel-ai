import { describe, expect, it } from "vitest";
import { annualMonthlyPrice, checkoutTotal, filterIncidents, isValidEmail, isValidProfile, onboardingCanContinue } from "./demo-utils";
import { initialIncidents, plans } from "./mock-data";

describe("CamSentinel platform flows", () => {
  it("calculates annual pricing and checkout totals", () => { expect(annualMonthlyPrice(249)).toBe(199); expect(checkoutTotal(plans[0], 16, "monthly")).toBe(111); });
  it("validates login and settings information", () => { expect(isValidEmail("hello@xsol.ai")).toBe(true); expect(isValidEmail("invalid")).toBe(false); expect(isValidProfile({ name: "Ahsan", email: "hello@xsol.ai", company: "XsolAI", timezone: "Asia/Karachi" })).toBe(true); });
  it("requires at least one onboarding camera", () => { expect(onboardingCanContinue([false, false])).toBe(false); expect(onboardingCanContinue([false, true])).toBe(true); });
  it("filters the incident workspace", () => { expect(filterIncidents(initialIncidents, "critical")).toHaveLength(1); expect(filterIncidents(initialIncidents, "all")).toHaveLength(3); });
});
