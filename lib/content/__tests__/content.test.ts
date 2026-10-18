import { describe, expect, it } from "vitest";
import { achievements, builds, experience, projects, siteConfig, tools } from "..";

describe("content integrity", () => {
  it("has unique tool keys", () => {
    const keys = tools.map((t) => t.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("only references known tools from builds, in non-empty order", () => {
    const known = new Set(tools.map((t) => t.key));
    for (const build of builds) {
      expect(build.tools.length).toBeGreaterThan(0);
      for (const key of build.tools) expect(known.has(key), `${build.title} → ${key}`).toBe(true);
      expect(new Set(build.tools).size).toBe(build.tools.length);
    }
  });

  it("lists the four résumé projects in résumé order with a visual each", () => {
    expect(projects.map((p) => p.slug)).toEqual(["pit-wall", "ultron-orb-ui", "sdxl-studio", "encrypted-chat"]);
    for (const p of projects) expect(["pitwall", "orb", "sdxl", "cipher"]).toContain(p.visual.kind);
  });

  it("keeps the experience bullets dev-first, QA last", () => {
    const leads = experience[0].bullets.map((b) => b.lead);
    expect(leads[0]).toBe("Applied AI");
    expect(leads[leads.length - 1]).toMatch(/QA/);
  });

  it("has a valid contact email and at least one record entry", () => {
    expect(siteConfig.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(achievements.achievements.length + achievements.certifications.length).toBeGreaterThan(0);
  });
});
