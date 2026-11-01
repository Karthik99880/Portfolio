"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { handoffTransition, useIntro } from "@/components/IntroHandoff";
import NameDrop from "@/components/NameDrop";
import { RIBBON_ID, RibbonFar, RibbonNear } from "@/components/Ribbon";
import { intro, opening } from "@/lib/content";
import styles from "./Intro.module.css";

type Phase = "idle" | "greet" | "name" | "hiding" | "done";

const STORAGE_KEY = "intro-played";
const FADE_MS = 600;
const STEP_MS = 850;
const NAME_HOLD_MS = 7000;
const SCROLL_KEYS = [" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
const LIME = "#dcff70";
const INK = "#0c0a08";
const words = [...intro.greetings.slice(0, 6), intro.lead];
const pop = { type: "spring", stiffness: 260, damping: 14 } as const;

// Marked on finish (not mount) so StrictMode's double effect run does not skip the first play.
function markPlayed() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
}

function marqueeLine(k: number) {
  const line = [...intro.greetings.slice(k), ...intro.greetings.slice(0, k)].join("   ·   ") + "   ·   ";
  return line + line;
}

export default function Intro() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [wink, setWink] = useState(false);
  const [shrink, setShrink] = useState<{ x: number; y: number; scale: number } | null>(null);
  const timers = useRef<number[]>([]);
  const cover = useRef<HTMLDivElement>(null);
  const leaving = useRef(false);
  const { stage, setStage } = useIntro();

  const px = useSpring(0, { stiffness: 60, damping: 18 });
  const py = useSpring(0, { stiffness: 60, damping: 18 });
  const nearX = useTransform(px, (v) => v * -70);
  const nearY = useTransform(py, (v) => v * -50);
  const farX = useTransform(px, (v) => v * 30);
  const farY = useTransform(py, (v) => v * 22);
  const eyeX = useTransform(px, (v) => v * 14);
  const eyeY = useTransform(py, (v) => v * 12);

  const clearAll = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    clearAll();
    window.scrollTo({ top: 0, behavior: "instant" });
    markPlayed();
    // Shapes shrink onto the hero ribbon; both share the 1280x800 box, so one uniform scale lines them up.
    const from = cover.current?.getBoundingClientRect();
    const to = document.getElementById(RIBBON_ID)?.getBoundingClientRect();
    if (from && to)
      setShrink({
        x: to.left + to.width / 2 - (from.left + from.width / 2),
        y: to.top + to.height / 2 - (from.top + from.height / 2),
        scale: to.width / from.width,
      });
    px.set(0);
    py.set(0);
    setPhase("hiding");
    setStage("handoff");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("done");
        setStage("idle");
      }, FADE_MS),
    );
  }, [clearAll, setStage, px, py]);

  useEffect(() => {
    let played = false;
    try {
      played = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      played = false;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    if (played || reduce) {
      markPlayed();
      at(0, () => setPhase("done"));
      return clearAll;
    }

    at(0, () => setStage("playing"));
    at(450, () => setPhase("greet"));
    for (let i = 1; i < words.length; i++) at(450 + i * STEP_MS, () => setStep(i));
    const named = 450 + (words.length - 1) * STEP_MS + 700;
    at(named, () => setPhase("name"));
    at(named + NAME_HOLD_MS, finish);
    return clearAll;
  }, [clearAll, setStage, finish]);

  // Any scroll attempt while the intro covers the page enters the site at the top instead of scrolling it underneath.
  useEffect(() => {
    if (stage !== "playing") return;
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      finish();
    };
    const key = (e: KeyboardEvent) => SCROLL_KEYS.includes(e.key) && block(e);
    const opts = { passive: false, capture: true };
    window.addEventListener("wheel", block, opts);
    window.addEventListener("touchmove", block, opts);
    window.addEventListener("keydown", key, true);
    return () => {
      window.removeEventListener("wheel", block, opts);
      window.removeEventListener("touchmove", block, opts);
      window.removeEventListener("keydown", key, true);
    };
  }, [stage, finish]);

  if (phase === "done") return null;

  // Matching the hero heading's width keeps the wrap identical, so the handoff is a pure translate.
  const heroWidth = phase === "name" ? document.getElementById("opening-heading")?.offsetWidth : undefined;
  const live = phase !== "idle";
  const named = phase === "name" || phase === "hiding";

  const poke = () => {
    if (phase !== "name") return;
    setWink(true);
    timers.current.push(window.setTimeout(() => setWink(false), 700));
  };

  return (
    <>
      <div
        aria-hidden="true"
        onPointerMove={(e) => {
          px.set(e.clientX / window.innerWidth - 0.5);
          py.set(e.clientY / window.innerHeight - 0.5);
        }}
        className={`${styles.intro} fixed inset-0 z-50 overflow-hidden text-void ${phase === "hiding" ? styles.hide : ""}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: live ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col justify-around"
        >
          {[0, 1, 2, 3, 4].map((k) => (
            <div key={k} className={`${styles.row} ${k % 2 ? styles.rev : ""}`}>
              {marqueeLine(k)}
            </div>
          ))}
        </motion.div>

        <div
          ref={cover}
          className="absolute top-1/2 left-1/2 aspect-[1280/800] w-[max(100vw,160lvh)] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.svg
            viewBox="0 0 1280 800"
            className="size-full overflow-visible"
            initial={{ scale: 0.55, rotate: -10, opacity: 0 }}
            animate={
              phase === "hiding"
                ? { ...(shrink ?? { x: 0, y: 0, scale: 1 }), rotate: 0, opacity: 1 }
                : live
                  ? { scale: 1, rotate: 0, opacity: 1 }
                  : {}
            }
            transition={phase === "hiding" ? handoffTransition : { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.g style={{ x: farX, y: farY }}>
              <g className={styles.driftB}>
                <RibbonFar />
              </g>
            </motion.g>
            <motion.g style={{ x: nearX, y: nearY }}>
              <g className={styles.driftA}>
                <RibbonNear />
              </g>
            </motion.g>
          </motion.svg>
        </div>

        <div className="absolute bottom-[clamp(96px,12svh,128px)] max-[699px]:bottom-[calc(clamp(20px,5svh,56px)+112px)] left-[clamp(20px,6vw,72px)] flex flex-col gap-5">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "name" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(16px,1.6vw,20px)] leading-tight font-bold"
          >
            {intro.caption[0]}
            <br />
            {intro.caption[1]}
          </motion.p>
          <div className="display-xl">
            <motion.div
              className="h-[1.15em] overflow-hidden"
              animate={phase === "hiding" ? { opacity: 0, y: "0.4em" } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: `${step * -1.75}em` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {words.map((w) => (
                  <div key={w} className="mb-[0.6em] h-[1.15em] leading-[1.15] whitespace-nowrap">
                    {w}
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <div className="min-h-[1em]">
              {phase === "name" ? <NameDrop name={opening.name} width={heroWidth} /> : null}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: named ? 1 : 0 }}
          transition={pop}
          onClick={poke}
          className="absolute top-[58%] max-[699px]:top-[24%] right-[clamp(24px,18vw,320px)] size-[clamp(84px,9vw,120px)] cursor-pointer"
        >
          <svg viewBox="0 0 120 120" className={`${styles.bob} size-full overflow-visible`}>
            <circle cx="60" cy="60" r="48" fill={LIME} stroke={INK} strokeWidth="5" />
            <motion.g style={{ x: eyeX, y: eyeY }} fill={INK}>
              <motion.ellipse
                cx="44"
                cy="48"
                rx="5.5"
                ry="8"
                animate={{ scaleY: wink ? 0.2 : 1 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
              <ellipse cx="76" cy="48" rx="5.5" ry="8" />
            </motion.g>
            <path
              d={wink ? "M 36 70 Q 60 100 84 70" : "M 40 74 Q 60 90 80 74"}
              fill="none"
              stroke={INK}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>
      {phase !== "hiding" ? (
        <button
          type="button"
          onClick={finish}
          className="group fixed right-[clamp(20px,5vw,64px)] bottom-[clamp(20px,5svh,56px)] z-[51] inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full bg-void px-6 font-mono text-[12px] tracking-[0.12em] text-[#dcff70] uppercase"
        >
          {phase === "name" ? "Come in" : "Skip"}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      ) : null}
    </>
  );
}
