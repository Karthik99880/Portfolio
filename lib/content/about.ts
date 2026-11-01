import type { AboutContent } from "./types";
import { siteConfig } from "./siteConfig";

export const about: AboutContent = {
  kicker: "a bit about me",
  heading: "Off the clock",
  paragraph:
    "Outside of work I end up building things that don't need to exist, just because they'd be fun. Usually something to do with F1, football, or cricket, whatever's in season. Otherwise I'm reading something completely unrelated to any of that, planning a trip, or badly attempting a new language. Headphones on for most of it.",
  facts: [
    { label: "Based in", value: siteConfig.location },
    { label: "Now", value: `Software Engineering Intern · ${siteConfig.company}` },
    { label: "Focus", value: siteConfig.tagline },
    { label: "Off-hours", value: "F1, football, cricket" },
    { label: "Status", value: "Open to full-stack & applied-AI roles", live: true },
  ],
};
