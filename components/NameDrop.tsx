"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type TargetAndTransition } from "motion/react";
import { HERO_NAME_ID, NameText, handoffTransition } from "@/components/IntroHandoff";
import { intro } from "@/lib/content";

type Stage = "drop" | "look" | "hop" | "done";
type Spot = { sx: number; sy: number; dx: number; dy: number; ay: number; tx: number };

const FALL = 0.62;
const DROP = 90;
const STEP = 0.11;
const LAND_PAUSE = 600;
const LOOK_HOLD = 2400;
const squash = { scaleY: [1.3, 1.25, 0.68, 1.06, 0.94, 1], scaleX: [0.85, 0.85, 1.28, 0.95, 1.04, 1] };
const times = [0, 0.62, 0.72, 0.84, 0.93, 1];

export default function NameDrop({ name, width }: { name: string; width?: number }) {
  const [stage, setStage] = useState<Stage>("drop");
  const [spot, setSpot] = useState<Spot | null>(null);
  const slot = useRef<HTMLSpanElement>(null);
  const anchor = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const bugDelay = 0.25 + (name.replace(/ /g, "").length - name.split(" ").length - 1) * STEP;

  useEffect(() => {
    let frame = 0;
    let live = true;
    // Measure after the display font loads, otherwise the stray i lands at fallback-font offsets.
    document.fonts.ready.then(() => {
      if (!live) return;
      frame = requestAnimationFrame(() => {
        const s = slot.current;
        const a = anchor.current;
        const t = tip.current;
        if (s && a && t) {
          const ax = a.offsetLeft + a.offsetWidth;
          // Keeps the bug note on screen on narrow phones; on wider screens the max never binds.
          const room = window.innerWidth - 20 - (t.offsetParent?.getBoundingClientRect().left ?? 0) - t.offsetWidth;
          setSpot({
            sx: s.offsetLeft,
            sy: s.offsetTop,
            dx: a.offsetLeft + a.offsetWidth - s.offsetLeft + s.offsetWidth * 0.4,
            dy: a.offsetTop - s.offsetTop,
            ay: a.offsetTop + s.offsetHeight,
            tx: Math.max(0, Math.min(ax - 40, room)),
          });
        }
      });
    });
    return () => {
      live = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!spot) return;
    const land = (bugDelay + FALL) * 1000;
    const timers = [
      window.setTimeout(() => setStage("look"), land + LAND_PAUSE),
      window.setTimeout(() => setStage("hop"), land + LAND_PAUSE + LOOK_HOLD),
      window.setTimeout(() => setStage("done"), land + LAND_PAUSE + LOOK_HOLD + FALL * 1000 + 50),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [spot, bugDelay]);

  const bugAt = name.indexOf("i");
  let order = 0;
  const parts = name.split(" ");
  const words = parts.map((word, w) => {
    const start = parts.slice(0, w).join(" ").length + (w ? 1 : 0);
    return (
      <span key={word} ref={w === parts.length - 1 ? anchor : undefined} className="inline-block whitespace-nowrap">
        {word.split("").map((ch, j) => {
          const at = start + j;
          if (j === 0) return <span key={at} className="inline-block">{ch}</span>;
          if (at === bugAt) return <span key={at} ref={slot} className="name-i invisible inline-block">{ch}</span>;
          const delay = 0.15 + order++ * STEP;
          return (
            <motion.span
              key={at}
              className="inline-block origin-bottom"
              initial={{ y: -DROP, opacity: 0 }}
              animate={{ y: [-DROP, 0, 0, -18, 0, 0], opacity: 1, ...squash }}
              transition={{ duration: FALL, delay, times, opacity: { duration: 0.18, delay } }}
            >
              {ch}
            </motion.span>
          );
        })}
      </span>
    );
  });

  const bug: TargetAndTransition = spot
    ? {
        drop: {
          opacity: 1,
          x: spot.dx,
          y: [spot.dy - DROP, spot.dy, spot.dy, spot.dy - 18, spot.dy, spot.dy],
          ...squash,
          transition: { duration: FALL, delay: bugDelay, times, x: { duration: 0 }, opacity: { duration: 0.18, delay: bugDelay } },
        },
        look: { opacity: 1, x: spot.dx, y: spot.dy, rotate: [0, -16, 14, -16, 0], transition: { duration: 1 } },
        hop: {
          opacity: 1,
          x: [spot.dx, spot.dx * 0.5, 0],
          y: [spot.dy, spot.dy * 0.5 - 190, 0],
          rotate: [0, -200, -360],
          scaleY: [0.8, 1.15, 1],
          scaleX: [1.15, 0.9, 1],
          transition: { duration: FALL, ease: "easeInOut" as const },
        },
        done: { opacity: 1, x: 0, y: 0, rotate: -360 },
      }[stage]
    : { opacity: 0 };

  return (
    <motion.span
      layoutId={HERO_NAME_ID}
      transition={handoffTransition}
      className="display-name relative block"
      style={{ width }}
    >
      <motion.span
        className="block origin-bottom-left"
        animate={stage === "done" ? { scale: [1, 1.045, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {stage === "done" ? <NameText name={name} /> : words.flatMap((w, i) => (i ? [" ", w] : [w]))}
      </motion.span>
      {stage !== "done" && spot ? (
        <motion.span
          aria-hidden="true"
          className="name-i absolute inline-block origin-bottom"
          style={{ left: spot.sx, top: spot.sy }}
          initial={{ opacity: 0 }}
          animate={bug}
        >
          i
        </motion.span>
      ) : null}
      <motion.span
        ref={tip}
        className="absolute rounded-lg bg-void px-3 py-2 font-mono text-[13px] leading-none tracking-normal whitespace-nowrap text-[#dcff70]"
        style={{ left: spot ? spot.tx : 0, top: spot ? spot.ay + 12 : 0 }}
        initial={{ opacity: 0, y: 8 }}
        animate={stage === "look" ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
      >
        {intro.bug}
      </motion.span>
      <motion.span
        className="absolute top-full left-0 mt-3 rounded-lg bg-accent px-3 py-2 font-mono text-[13px] leading-none tracking-normal whitespace-nowrap text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={stage === "done" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
      >
        {intro.fixed}
      </motion.span>
    </motion.span>
  );
}
