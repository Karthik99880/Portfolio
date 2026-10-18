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

export interface OpeningContent {
  name: string;
  line: string;
  meta: string;
  primaryCta: SiteLink;
  secondaryCta: SiteLink;
}

export interface AboutContent extends SectionHeading {
  paragraph: string;
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

export interface ContactContent extends SectionHeading {
  blurb: string;
  labels: { name: string; email: string; message: string };
  submitLabel: string;
  sending: string;
  success: string;
  failure: string;
}
