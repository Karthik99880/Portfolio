"use client";

import { useState } from "react";
import { projects, projectsHeading } from "@/lib/content";
import { SectionHead } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import styles from "./Projects.module.css";

export default function Projects() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="work" className="section section--dark" aria-labelledby="work-heading">
      <div className="container">
        <SectionHead id="work" kicker={projectsHeading.kicker} heading={projectsHeading.heading} lede={projectsHeading.lede} />
        <div className={styles.chips} role="tablist" aria-label="Projects">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-controls={`project-${p.slug}`}
              className={styles.chip}
              onClick={() => setCurrent(i)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <ProjectCard key={projects[current].slug} project={projects[current]} index={current} />
      </div>
    </section>
  );
}
