import type { HeroLines, ReactionContent } from "./types";

export const heroLines: HeroLines = {
  welcome: "Welcome to my portfolio! The good stuff's just below.",
  backFromWork: "Back already? Hope you liked the projects.",
  backFromContact: "Thanks for sticking around. Hope you liked it!",
};

export const reaction: ReactionContent = {
  ask: "Hey! Wanna see how fast your reactions are?",
  yes: "Let's go",
  later: "Maybe later",
  title: "Reaction test",
  close: "Close the reaction test",
  hint: "Click the circle the moment it turns green.",
  now: "Now! Click!",
  pad: {
    ready: ["Start", "tap to begin"],
    wait: ["…", "wait for it"],
    go: ["Now!", "click"],
    result: ["{ms}", "ms · again?"],
    early: ["Oops", "try again"],
  },
  early: "Whoa, eager! Wait for the flash.",
  best: "New personal best! I'd put that on a résumé.",
  verdicts: [
    { under: 200, text: "{ms} ms?! Okay, show-off." },
    { under: 300, text: "{ms} ms. Faster than my code compiles." },
    { under: 450, text: "{ms} ms. Solid. Wanna go again?" },
    { under: Infinity, text: "{ms} ms. Warming up, right? One more." },
  ],
  bestLabel: "Best",
  triesLabel: "Tries",
  footerLink: "Test your reactions ↑",
};
