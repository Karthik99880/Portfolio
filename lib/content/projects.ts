import type { Project, SectionHeading } from "./types";

export const projectsHeading: SectionHeading = {
  kicker: "selected work",
  heading: "Four things I built",
};

// Résumé order, résumé wording, condensed for a card, never embellished.
export const projects: Project[] = [
  {
    slug: "pit-wall",
    name: "Karthik's Pit Wall",
    eyebrow: "F1 dashboard · live",
    summary:
      "A real-time Formula 1 dashboard: live standings, constructor progress tracking and a championship predictor, sourcing live data from the Jolpica/Ergast API.",
    fact: "Radix UI · TanStack Query · SonarCloud CI · Vercel",
    tags: ["React", "TypeScript", "Vite"],
    href: "https://karthik-pit-wall.vercel.app/",
    visual: {
      kind: "pitwall",
      image: {
        src: "/projects/pit-wall.png",
        alt: "Karthik's Pit Wall: the live F1 standings dashboard",
        width: 1280,
        height: 800,
      },
    },
  },
  {
    slug: "ultron-orb-ui",
    name: "Ultron Orb UI",
    eyebrow: "Hand-tracked interface",
    summary:
      "Extended an open-source Three.js / MediaPipe hand-tracking interface with an interactive 3D Earth globe, a HUD dashboard, a spatial sound engine and live weather.",
    fact: "Rewrote the gesture pipeline · pinch-to-spin · two-hand zoom",
    tags: ["Next.js", "Three.js", "MediaPipe"],
    // Reel at /videos/ultron-orb.mp4 is parked until it is reviewed.
    href: null,
    visual: {
      kind: "orb",
      caption: "pinch to spin · two hands to zoom",
    },
  },
  {
    slug: "sdxl-studio",
    name: "SDXL Image Studio",
    eyebrow: "ML systems · Capstone-Flask",
    summary:
      "A browser-based Stable Diffusion XL studio, co-built on Flask + PyTorch: text-to-image, image-to-image and 4× upscaling via the SD x4 Upscaler.",
    fact: "CUDA / xFormers inference · Apple Silicon MPS",
    tags: ["Python", "Flask", "PyTorch"],
    href: "https://github.com/Qasim-1478/Capstone-Flask",
    visual: {
      kind: "sdxl",
      url: "sdxl-studio.local/generate",
      prompt: "a lighthouse at dusk, cinematic",
      cta: "Generate",
    },
  },
  {
    slug: "encrypted-chat",
    name: "Encrypted Chat Application",
    eyebrow: "Systems · security",
    summary:
      "A secure multi-client chat platform built from scratch on raw TCP sockets and multithreading, with AES encryption keeping every message private over an untrusted network.",
    fact: "Raw TCP · multithreaded · AES end-to-end",
    tags: ["Java", "AES", "Sockets"],
    href: "https://github.com/Karthik99880/Server",
    visual: {
      kind: "cipher",
      clients: ["client-01", "client-02"],
      plaintext: "meet at the paddock, 6:30",
    },
  },
];
