"use client";

import type { Project } from "@/lib/content";
import { TagList } from "@/components/Tag";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useInView } from "@/components/toys/hooks";
import { PitWallToy } from "@/components/toys/PitWallToy";
import { OrbToy } from "@/components/toys/OrbToy";
import { SdxlToy } from "@/components/toys/SdxlToy";
import { ChatToy } from "@/components/toys/ChatToy";
import styles from "./Projects.module.css";

function Toy({ project, active, reduced }: { project: Project; active: boolean; reduced: boolean }) {
  const { visual } = project;
  switch (visual.kind) {
    case "pitwall":
      return <PitWallToy image={visual.image} href={project.href} />;
    case "orb":
      return <OrbToy active={active} reduced={reduced} />;
    case "sdxl":
      return <SdxlToy active={active} reduced={reduced} url={visual.url} />;
    case "cipher":
      return <ChatToy active={active} reduced={reduced} clients={visual.clients} initial={visual.plaintext} />;
  }
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const [stageRef, inView] = useInView<HTMLDivElement>();
  const headingId = `project-${project.slug}-heading`;
  const external = project.href !== null;

  return (
    <article
      id={`project-${project.slug}`}
      role="tabpanel"
      aria-labelledby={headingId}
      className={styles.proj}
    >
      <div ref={stageRef} className={styles.stage}>
        <Toy project={project} active={inView} reduced={reduced} />
      </div>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>
          {String(index + 1).padStart(2, "0")} · {project.eyebrow}
        </span>
        <h3 id={headingId} className={`display-md ${styles.name}`}>
          {project.name}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <TagList items={project.tags} />
        <span className={styles.fact}>{project.fact}</span>
        <div className={styles.linkRow}>
          <a
            href={project.href ?? "#"}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={styles.visit}
          >
            {project.href === null
              ? "[Video link]"
              : project.href.includes("github.com")
                ? "GitHub ↗"
                : "Live Demo ↗"}
            {external ? <span className="sr-only"> {project.name} (opens in a new tab)</span> : null}
          </a>
          <span className={styles.note}>the toy is a stand-in, the link is the real thing</span>
        </div>
      </div>
    </article>
  );
}
