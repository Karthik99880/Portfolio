"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Section, SectionHead } from "@/components/Section";
import { builds, skillsHeading, tools } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Skills.module.css";

const TOUR_MS = 3800;
const WORD_DELAY_S = 0.09;
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const buildCount = WORDS[builds.length] ?? String(builds.length);

type WordStyle = CSSProperties & { "--d": string };

export default function Skills() {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [inView, setInView] = useState(false);
  const [peek, setPeek] = useState<string | null>(null);

  useEffect(() => {
    const el = document.getElementById("skills") ?? gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || pinned || reduced) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % builds.length), TOUR_MS);
    return () => clearInterval(id);
  }, [inView, pinned, reduced]);

  const activeTools = builds[current].tools;
  const peekLabel = peek ? tools.find((t) => t.key === peek)?.label : null;
  const peekCount = peek ? builds.filter((b) => b.tools.includes(peek)).length : 0;

  return (
    <Section id="skills">
      <SectionHead id="skills" {...skillsHeading} />
      <div
        ref={gridRef}
        className="grid grid-cols-[minmax(260px,340px)_minmax(0,1fr)] items-start gap-x-16 gap-y-6 max-[760px]:grid-cols-1 max-[760px]:gap-10"
      >
        <ul className="m-0 flex list-none flex-col p-0">
          {builds.map((b, i) => {
            const on = i === current;
            const uses = peek !== null && !on && b.tools.includes(peek);
            const panelId = `skills-build-${i}`;
            return (
              <li
                key={b.title}
                className={`${styles.brief} ${on ? styles.on : ""} ${uses ? styles.uses : ""}`}
              >
                <button
                  type="button"
                  className={styles.briefBtn}
                  aria-expanded={on}
                  aria-controls={panelId}
                  onClick={() => {
                    setPinned(true);
                    setCurrent(i);
                  }}
                >
                  {b.title}
                </button>
                <div id={panelId} className={styles.more} aria-hidden={!on}>
                  <div>
                    <p className="m-0 mb-3 max-w-[34ch] text-[15px] leading-[1.5] text-muted">{b.why}</p>
                    <span className="mb-4 block font-mono text-[11px] tracking-[0.08em] text-accent">
                      {b.where}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div>
          <div
            className="flex flex-wrap gap-[0.2em_0.8em] font-display text-[clamp(22px,3vw,36px)] leading-[1.2] font-semibold tracking-[-0.01em] text-balance"
            aria-label="Tools I work with"
          >
            {tools.map((t) => {
              const n = activeTools.indexOf(t.key);
              const lit = n !== -1;
              const style: WordStyle = {
                "--d": lit && !reduced ? `${(n * WORD_DELAY_S).toFixed(2)}s` : "0s",
              };
              return (
                <button
                  key={t.key}
                  type="button"
                  className={`${styles.w} ${lit ? styles.lit : ""} ${peek === t.key ? styles.peek : ""}`}
                  style={style}
                  onMouseEnter={() => setPeek(t.key)}
                  onMouseLeave={() => setPeek(null)}
                  onFocus={() => setPeek(t.key)}
                  onBlur={() => setPeek(null)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <div
            className="mt-6 min-h-5 font-mono text-[12px] tracking-[0.04em] text-muted"
            aria-live="polite"
          >
            {peekLabel ? (
              <>
                <b className="font-medium text-ink">{peekLabel}</b> ·{" "}
                {peekCount
                  ? `used in ${peekCount} of these ${buildCount}`
                  : `in the toolbox, not in these ${buildCount}`}
              </>
            ) : (
              <>
                <b className="font-medium text-ink">{activeTools.length}</b> of {tools.length} · lit in
                the order I reached for them
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
