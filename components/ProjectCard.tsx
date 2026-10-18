import type { Ref } from "react";
import type { Project } from "@/lib/content";
import { TagList } from "@/components/Tag";
import { PitWallVisual } from "@/components/visuals/PitWallVisual";
import { OrbVisual } from "@/components/visuals/OrbVisual";
import { SdxlVisual } from "@/components/visuals/SdxlVisual";
import { CipherVisual } from "@/components/visuals/CipherVisual";
import styles from "./Projects.module.css";

export interface ProjectCardProps {
  project: Project;
  active: boolean;
  ref?: Ref<HTMLElement>;
}

function hostOf(href: string | null, fallback: string): string {
  if (!href) return fallback;
  try {
    return new URL(href).host;
  } catch {
    return fallback;
  }
}

function Visual({ project, active }: { project: Project; active: boolean }) {
  const { visual } = project;
  switch (visual.kind) {
    case "pitwall":
      return <PitWallVisual visual={visual} label={hostOf(project.href, project.slug)} active={active} />;
    case "orb":
      return <OrbVisual visual={visual} label={project.slug} active={active} />;
    case "sdxl":
      return <SdxlVisual visual={visual} active={active} />;
    case "cipher":
      return <CipherVisual visual={visual} label={project.slug} active={active} />;
  }
}

export function ProjectCard({ project, active, ref }: ProjectCardProps) {
  const headingId = `project-${project.slug}-heading`;
  return (
    <article ref={ref} aria-labelledby={headingId} className={styles.proj}>
      <Visual project={project} active={active} />
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{project.eyebrow}</span>
        <h3 id={headingId} className={`display-md ${styles.name}`}>
          {project.name}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <span className={styles.fact}>{project.fact}</span>
        <TagList items={project.tags} />
        {project.href ? (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.visit}>
            {project.href.includes("github.com") ? "GitHub ↗" : "Live Demo ↗"}
            <span className="sr-only"> {project.name} (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
