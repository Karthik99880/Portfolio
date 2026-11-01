"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { TagList } from "@/components/Tag";
import { education, experience, experienceHeading } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

const card = "grid gap-x-7 gap-y-4 rounded-[6px] border border-line bg-paper px-6 py-7 min-[720px]:grid-cols-[190px_minmax(0,1fr)] min-[720px]:px-8";
const dot = "absolute -left-11 size-4 rounded-full outline-[5px] outline-canvas";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <Section id="experience">
      <SectionHead id="experience" {...experienceHeading} />
      <div ref={ref} className="relative flex flex-col gap-5 pl-11">
        <div aria-hidden="true" className="absolute top-1.5 bottom-1.5 left-[7px] w-0.5 bg-line" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
          className="absolute top-1.5 bottom-1.5 left-[7px] w-0.5 origin-top bg-accent"
        />
        {experience.map((role, i) => (
          <Reveal as="div" key={`${role.title}-${role.company}`} className="relative">
            <span aria-hidden="true" className={`${dot} top-2 bg-leaf`} />
            <article className={card}>
              <div className="flex flex-col items-start gap-1.5">
                <span className="font-mono text-[12px] text-muted">{role.period}</span>
                <span className="text-[16px] leading-[1.4] text-ink">{role.company}</span>
                {i === 0 && (
                  <span className="mt-2 rounded-full bg-lime px-2.5 py-1 font-mono text-[11px] leading-none text-ink">Current</span>
                )}
              </div>
              <div>
                <h3 className="display-md m-0 text-ink">{role.title}</h3>
                <ul className="m-0 mt-5 flex max-w-[64ch] list-none flex-col gap-2.5 p-0">
                  {role.bullets.map((bullet) => (
                    <li key={bullet.lead} className="text-[15px] leading-[1.55] text-muted">
                      <b className="font-semibold text-ink">{bullet.lead}.</b> {bullet.text}
                    </li>
                  ))}
                </ul>
                <TagList items={role.tags} className="mt-6" />
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal as="div" className="relative">
          <span aria-hidden="true" className={`${dot} top-2 border-2 border-line bg-canvas`} />
          <article className={card}>
            <span className="font-mono text-[12px] tracking-[0.12em] text-muted uppercase">{education.label}</span>
            <p className="m-0 text-[16px] leading-[1.5] text-ink">{education.text}</p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
