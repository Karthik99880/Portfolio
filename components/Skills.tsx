"use client";

import { useEffect, useRef, useState } from "react";
import { inView } from "motion/react";
import { Section, SectionHead } from "@/components/Section";
import { builds, music, skillsHeading, tools } from "@/lib/content";
import { humStore, pluck, useStore } from "@/lib/sound";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Skills.module.css";

const STEP_MS = 240;
const short = (w: string) => w.split(" · ")[0];
const slug = (w: string) => short(w).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const label = new Map(tools.map((t) => [t.key, t.label]));
const git = tools.find((t) => t.key === "git");
const keys = tools.filter((t) => t.key !== "git");
const pitch = (key: string) => tools.findIndex((t) => t.key === key);
const KEYMAP = "1234567890qwertyuiopasdfghjklzxcvbnm";
const order = git ? [...keys, git] : keys;
const bound = new Map(order.slice(0, KEYMAP.length).map((t, i) => [KEYMAP[i], t.key]));
const hint = new Map([...bound].map(([c, k]) => [k, c]));

export default function Skills() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [build, setBuild] = useState(0);
  const [step, setStep] = useState(builds[0].tools.length);
  const [played, setPlayed] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const hum = useStore(humStore);

  const b = builds[build];
  const shown = reduced ? b.tools.length : step;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    return inView(el, () => {
      setPlayed(true);
      setStep(0);
      return undefined;
    }, { amount: 0.4 });
  }, []);

  useEffect(() => {
    if (!played || reduced || step >= b.tools.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [played, reduced, step, b.tools.length]);

  useEffect(() => {
    if (hum && step >= 1 && step <= b.tools.length) pluck(pitch(b.tools[step - 1]));
  }, [hum, step, b]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
      const k = bound.get(e.key.toLowerCase());
      if (!k) return;
      if (!humStore.get()) humStore.set(true);
      pluck(pitch(k));
      setInfo(k);
      if (!reduced)
        board
          .querySelector(`[data-k="${k}"]`)
          ?.animate([{ transform: "translateY(3px)", background: "var(--color-leaf)" }, { transform: "none" }], { duration: 300, easing: "ease-out" });
    };
    return inView(board, () => {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    });
  }, [reduced]);

  const pick = (i: number) => {
    setBuild(i);
    setInfo(null);
    setPlayed(true);
    setStep(0);
  };

  const typed = b.tools.slice(0, shown).map((k) => label.get(k) ?? k);
  const infoKey = info ? tools.find((t) => t.key === info) : null;
  const usedIn = info ? builds.filter((x) => x.tools.includes(info)).map((x) => short(x.where)) : [];

  const renderKey = (t: { key: string; label: string }, wide = false) => {
    const n = b.tools.indexOf(t.key);
    const lit = n !== -1 && n < shown;
    return (
      <button
        key={t.key}
        type="button"
        data-k={t.key}
        aria-pressed={info === t.key}
        className={`${styles.key} ${wide ? styles.wide : ""} ${lit ? styles.lit : ""} ${lit && played && !reduced ? styles.fresh : ""} ${info === t.key ? styles.sel : ""}`}
        onClick={() => {
          setInfo(info === t.key ? null : t.key);
          if (hum) pluck(pitch(t.key));
        }}
      >
        {t.label}
        {hint.has(t.key) ? (
          <kbd aria-hidden="true" className={styles.hint}>
            {hint.get(t.key)}
          </kbd>
        ) : null}
      </button>
    );
  };

  return (
    <Section id="skills">
      <SectionHead id="skills" {...skillsHeading} />
      <div ref={rootRef}>
        <div className={styles.chips} role="group" aria-label="Builds">
          {builds.map((x, i) => (
            <button
              key={x.title}
              type="button"
              aria-pressed={i === build}
              className={`${styles.chip} ${i === build ? styles.on : ""}`}
              onClick={() => pick(i)}
            >
              {short(x.where)}
            </button>
          ))}
        </div>

        <div className={styles.prompt}>
          <p className={styles.line} aria-hidden="true">
            <span className="text-accent">~/{slug(b.where)} $</span> {typed.join(" + ")}
            <span className={styles.caret} />
          </p>
          <p className="sr-only" aria-live="polite">
            {shown >= b.tools.length ? `${short(b.where)}: ${b.tools.map((k) => label.get(k) ?? k).join(", ")}` : ""}
          </p>
          <p className={styles.why}>
            {b.why} <span className="font-mono text-[11px] tracking-[0.08em] text-accent">{b.where}</span>
          </p>
        </div>

        <div ref={boardRef} className={styles.board} role="group" aria-label="Tools">
          {keys.map((t) => renderKey(t))}
          {git ? renderKey(git, true) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className={styles.info}>
            {infoKey ? (
              <>
                <b className="font-medium text-ink">{infoKey.label}</b> ·{" "}
                {usedIn.length ? `used in ${usedIn.join(", ")}` : "in the toolbox, not in a shipped build yet"}
              </>
            ) : (
              "Lit keys are the build. Click a key, or play them on your keyboard."
            )}
          </p>
          <button
            type="button"
            aria-pressed={hum}
            onClick={() => humStore.set(!hum)}
            className="mt-4 inline-flex min-h-11 cursor-pointer min-[900px]:min-h-9 items-center gap-2 rounded-full border border-line bg-transparent px-3.5 font-mono text-[11px] tracking-[0.1em] text-ink uppercase transition-colors hover:border-ink"
          >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 9v6h4l5 4V5L8 9H4z" />
              {hum ? <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /> : <path d="M17 9l5 6M22 9l-5 6" />}
            </svg>
            {hum ? music.humOn : music.humOff}
          </button>
        </div>
      </div>
    </Section>
  );
}
