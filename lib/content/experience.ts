import type { ExperienceRole, SectionHeading } from "./types";

export const experienceHeading: SectionHeading = {
  kicker: "experience",
  heading: "Where I've worked",
};

// Exactly what the résumé says, development first, QA last. Not a showcase.
export const experience: ExperienceRole[] = [
  {
    title: "Software Engineering Intern",
    company: "Vydhyo Healthcare",
    period: "Feb 2026 – Present",
    bullets: [
      {
        lead: "Applied AI",
        text: "Built an agentic AI doctor-booking assistant (Express.js, LangGraph.js, Google Gemini 2.5 Flash) with Zod-validated tool calls, self-healing retries and rate limiting, and shipped its React 19 + Vite chat widget.",
      },
      {
        lead: "Real-time features",
        text: "Developed blood-donation request and chat features (Socket.io) in the patient app — live request tracking, geocoding-based donor matching and push notifications.",
      },
      {
        lead: "Test automation & QA",
        text: "Built and maintained a Java/Playwright automation suite (TestNG, Allure), ran REST API contract audits and k6/Locust load testing, alongside manual QA tracking.",
      },
    ],
    tags: ["Express.js", "LangGraph.js", "Socket.io", "React", "Playwright", "TestNG", "k6"],
  },
];
