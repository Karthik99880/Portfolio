import { describe, expect, it } from "vitest";
import { firstFieldError, validateContact } from "../validate";

const good = { name: "Karthik Bachu", email: "hello@example.com", message: "This is a long enough message." };

describe("validateContact", () => {
  it("accepts valid input and returns trimmed data", () => {
    const result = validateContact({ ...good, name: "  Karthik  ", email: " hello@example.com " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Karthik");
      expect(result.data.email).toBe("hello@example.com");
    }
  });

  it("rejects short and long names", () => {
    expect(validateContact({ ...good, name: "K" })).toMatchObject({ ok: false, fieldErrors: { name: expect.any(String) } });
    expect(validateContact({ ...good, name: "x".repeat(81) }).ok).toBe(false);
    expect(validateContact({ ...good, name: "x".repeat(80) }).ok).toBe(true);
  });

  it("rejects malformed or over-long emails", () => {
    for (const email of ["", "nope", "a@b", "a b@c.com", "a@b.c", `${"a".repeat(250)}@x.com`]) {
      const result = validateContact({ ...good, email });
      expect(result.ok, email).toBe(false);
      if (!result.ok) expect(result.fieldErrors.email).toBeDefined();
    }
    expect(validateContact({ ...good, email: "first.last+tag@sub.example.co" }).ok).toBe(true);
  });

  it("rejects short and long messages", () => {
    expect(validateContact({ ...good, message: "a" }).ok).toBe(false);
    expect(validateContact({ ...good, message: "Hire you?" }).ok).toBe(true);
    expect(validateContact({ ...good, message: "m".repeat(2001) }).ok).toBe(false);
    expect(validateContact({ ...good, message: "m".repeat(2000) }).ok).toBe(true);
  });

  it("treats non-string values as empty", () => {
    const result = validateContact({ name: null, email: undefined, message: 42 });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.fieldErrors)).toEqual(["name", "email", "message"]);
  });

  it("reports the first field error in form order", () => {
    expect(firstFieldError({ email: "e", message: "m" })).toBe("e");
    expect(firstFieldError({ name: "n", message: "m" })).toBe("n");
    expect(firstFieldError({})).toBeUndefined();
  });
});
