import type { OpeningContent } from "./types";

export const opening: OpeningContent = {
  name: "Karthik Bachu",
  line: "Software engineer. Full-stack, applied AI, and the tests that keep both honest.",
  meta: "Hyderabad, India · open to full-stack & applied-AI roles",
  proof: [
    { value: "560", count: 560, label: "automated tests on a live product" },
    { value: "4", count: 4, label: "projects shipped, one of them live" },
    { value: "Top 15", unit: "/60", label: "24-hour hackathon" },
    { value: "OCI", label: "Generative AI Professional, 2025", accent: true },
  ],
  primaryCta: { label: "See the work", href: "#work" },
  secondaryCta: { label: "Say hello", href: "#contact" },
};
