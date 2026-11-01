export interface SiteLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  role: string;
  company: string;
  email: string;
  location: string;
  tagline: string;
  description: string;
  url: string;
  links: SiteLink[];
  resumeHref: string | null;
}

export interface IntroContent {
  greetings: string[];
  lead: string;
  caption: string[];
  bug: string;
  fixed: string;
}

export interface SectionHeading {
  kicker: string;
  heading: string;
  lede?: string;
}

export interface ProofStat {
  value: string;
  count?: number;
  unit?: string;
  label: string;
  accent?: boolean;
}

export interface OpeningContent {
  name: string;
  line: string;
  meta: string;
  proof: ProofStat[];
  primaryCta: SiteLink;
  secondaryCta: SiteLink;
}

export interface AboutFact {
  label: string;
  value: string;
  live?: boolean;
}

export interface AboutContent extends SectionHeading {
  paragraph: string;
  facts: AboutFact[];
}

export interface ExperienceBullet {
  lead: string;
  text: string;
}

export interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  bullets: ExperienceBullet[];
  tags: string[];
}

export interface Education {
  label: string;
  text: string;
}

export interface Tool {
  key: string;
  label: string;
}

export interface Build {
  title: string;
  why: string;
  where: string;
  tools: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PitWallVisual {
  kind: "pitwall";
  image: ProjectImage;
}

export interface OrbVisual {
  kind: "orb";
  caption: string;
}

export interface SdxlVisual {
  kind: "sdxl";
  url: string;
  prompt: string;
  cta: string;
}

export interface CipherVisual {
  kind: "cipher";
  clients: [string, string];
  plaintext: string;
}

export type ProjectVisual = PitWallVisual | OrbVisual | SdxlVisual | CipherVisual;

export interface Project {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  fact: string;
  tags: string[];
  href: string | null;
  visual: ProjectVisual;
}

export interface LogEntry {
  label: string;
  detail: string;
}

export interface AchievementsContent extends SectionHeading {
  achievementsTitle: string;
  certificationsTitle: string;
  achievements: LogEntry[];
  certifications: LogEntry[];
}

export interface MusicContent {
  humOff: string;
  humOn: string;
  playlistId: string;
  listen: string;
  playerLabel: string;
  shuffle: string;
  fullPlaylist: string;
  close: string;
}

export interface HeroLines {
  welcome: string;
  backFromWork: string;
  backFromContact: string;
}

export type ReactionGame ="ready" | "wait" | "go" | "result" | "early";

export interface ReactionContent {
  ask: string;
  yes: string;
  later: string;
  title: string;
  close: string;
  hint: string;
  now: string;
  pad: Record<ReactionGame, [string, string]>;
  early: string;
  best: string;
  verdicts: { under: number; text: string }[];
  bestLabel: string;
  triesLabel: string;
  footerLink: string;
}

export type CompoundId = "soft" | "medium" | "hard";

export interface Compound {
  id: CompoundId;
  key: string;
  name: string;
  ask: string;
  color: string;
  hint: string;
}

type RadioPhase = "idle" | "tx" | "done" | "err";

export interface ContactContent extends SectionHeading {
  navLabel: string;
  blurb: string;
  channel: string;
  steps: { compound: string; name: string; email: string; message: string };
  placeholders: { name: string; email: string };
  compounds: Compound[];
  info: { direct: string; base: string; baseValue: string; reply: string; replyValue: string };
  status: Record<RadioPhase, string>;
  transmit: Record<RadioPhase, string>;
  pitWall: string;
  lost: string;
  idleLine: string;
  reply: string;
  errors: { name: string; email: string; message: string };
  failure: string;
}
