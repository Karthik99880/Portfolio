import type { ContactContent } from "./types";

export const contact: ContactContent = {
  kicker: "contact",
  heading: "Get on the radio.",
  navLabel: "Radio in",
  blurb: "Pick a compound for how big the ask is, say your piece, and transmit. It lands in my inbox and I reply to the channel you leave.",
  channel: "Team radio · CH 99 · Karthik",
  steps: { compound: "01 · Pick a compound", name: "02 · Callsign", email: "Return channel", message: "03 · Your message" },
  placeholders: { name: "Your name", email: "you@company.com" },
  compounds: [
    { id: "soft", key: "S", name: "Soft", ask: "Quick hello", color: "#ff3b3b", hint: "Saw the Pit Wall dashboard, nice work. Box, box." },
    { id: "medium", key: "M", name: "Medium", ask: "Let's build something", color: "#ffd23f", hint: "I have a project idea and want to talk it through." },
    { id: "hard", key: "H", name: "Hard", ask: "Role or internship", color: "#f4f4f0", hint: "We're hiring for a full-stack role. Are you open to it?" },
  ],
  info: { direct: "Direct line", base: "Pit wall", baseValue: "Hyderabad", reply: "Usual reply", replyValue: "within a day" },
  status: { idle: "Pit wall online", tx: "Transmitting", done: "Copy · received", err: "No signal" },
  transmit: { idle: "Transmit", tx: "On air…", done: "New message", err: "Try again" },
  pitWall: "Pit wall",
  lost: "Signal lost",
  idleLine: "Radio is open. Nothing transmitted yet.",
  reply: "Copy that, {name}. Message received loud and clear. I'll come back on {email} within a day.",
  errors: {
    name: "No callsign. Tell me who's on the radio.",
    email: "Return channel looks wrong, so I couldn't reply.",
    message: "Message too short to copy. Say a word or two.",
  },
  failure: "Didn't go through on my end. Use the direct line instead.",
};
