"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects, projectsHeading } from "@/lib/content";
import { SectionHead } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Projects.module.css";

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<boolean[]>(() => projects.map(() => false));
  const areaRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const activate = useCallback((index: number) => {
    setActive((prev) => (prev[index] ? prev : prev.map((v, i) => (i === index ? true : v))));
  }, []);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const cards = cardRefs.current;
    const slots = slotRefs.current;
    const state = projects.map(() => ({ scale: 0.92, opacity: 0.4, y: 14 }));
    let raf = 0;
    let running = false;

    const frame = () => {
      const focusLine = window.innerHeight * 0.42;
      const falloff = window.innerHeight * 0.6;
      let bestIndex = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - focusLine);
        const focus = Math.max(0, 1 - dist / falloff);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
        if (reducedMotion) return;
        const s = state[i];
        const targetScale = 0.9 + 0.1 * focus;
        const targetOpacity = 0.35 + 0.65 * focus;
        const targetY = (1 - focus) * 18;
        s.scale += (targetScale - s.scale) * 0.12;
        s.opacity += (targetOpacity - s.opacity) * 0.12;
        s.y += (targetY - s.y) * 0.12;
        card.style.transform = `translateY(${s.y.toFixed(2)}px) scale(${s.scale.toFixed(3)})`;
        card.style.opacity = s.opacity.toFixed(3);
        if (focus > 0.82) activate(i);
      });

      const first = slots[0];
      const last = slots[slots.length - 1];
      let progress = 0;
      if (first && last) {
        const a = first.getBoundingClientRect();
        const b = last.getBoundingClientRect();
        const start = a.top + a.height / 2;
        const end = b.top + b.height / 2;
        progress = Math.max(0, Math.min(1, (focusLine - start) / (end - start)));
      }
      if (fillRef.current) fillRef.current.style.width = `${(progress * 100).toFixed(1)}%`;
      if (labelRef.current) labelRef.current.textContent = projects[bestIndex]?.name ?? "";
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver((entries) => {
      const visible = entries[entries.length - 1]?.isIntersecting ?? false;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(area);

    if (reducedMotion) {
      cards.forEach((card) => {
        if (!card) return;
        card.style.transform = "";
        card.style.opacity = "";
      });
    }

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, activate]);

  useEffect(() => {
    if (!reducedMotion) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const index = cardRefs.current.indexOf(e.target as HTMLElement);
          if (index >= 0) {
            activate(index);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    cardRefs.current.forEach((card) => {
      if (card) io.observe(card);
    });
    return () => io.disconnect();
  }, [reducedMotion, activate]);

  return (
    <section id="work" className="section section--dark" aria-labelledby="work-heading">
      <div className="container">
        <SectionHead id="work" kicker={projectsHeading.kicker} heading={projectsHeading.heading} lede={projectsHeading.lede} />
        <div ref={areaRef}>
          <div className={styles.scrubber} aria-hidden="true">
            <span ref={labelRef} className={styles.scrubberLabel} />
            <div className={styles.scrubberTrack}>
              <div ref={fillRef} className={styles.scrubberFill} />
            </div>
          </div>
          <div className="flex flex-col">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
                className={styles.slot}
              >
                <ProjectCard
                  project={project}
                  active={active[i]}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                />
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="min-h-[30vh]" />
        </div>
      </div>
    </section>
  );
}
