import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Karthik Bachu",
  fullName: "Sai Venkata Karthik Bachu",
  role: "Software Engineer",
  company: "Vydhyo Healthcare",
  email: "saivenkatakarthikb@gmail.com",
  location: "Hyderabad, India",
  tagline: "Full-stack + Applied AI",
  description:
    "Software engineer building full-stack and applied-AI systems on a live healthcare platform — an LLM booking assistant, real-time features, and a 560-test automation suite.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Add GitHub / LinkedIn here when the URLs are available; the nav renders whatever is listed.
  links: [],
  resumeHref: null,
};
