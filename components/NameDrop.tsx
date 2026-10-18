"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type TargetAndTransition } from "motion/react";
import { HERO_NAME_ID, NameText, handoffTransition } from "@/components/IntroHandoff";
import { intro } from "@/lib/content";

type Stage = "drop" | "look" | "hop" | "done";
type Spot = { sx: number; sy: number; dx: number; dy: number; ax: number; ay: number };

const FALL = 0.62;
const STEP = 0.09;
const squash = { scaleY: [1.3, 1.25, 0.68, 1.06, 0.94, 1], scaleX: [0.85, 0.85, 1.28, 0.95, 1.04, 1] };
const times = [0, 0.62, 0.72, 0.84, 0.93, 1];

export default function NameDrop({ name, width }: { name: string; width?: number }) {
  const [stage, setStage] = useState<Stage>("drop");
  const [spot, setSpot] = useState<Spot | null>(null);
  const [fall] = useState(() => window.innerHeight);
  const slot = useRef<HTMLSpanElement>(null);
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const s = slot.current;
      const a = anchor.current;
      if (s && a)
        setSpot({
          sx: s.offsetLeft,
          sy: s.offsetTop,
          dx: a.offsetLeft - s.offsetLeft + s.offsetWidth * 0.4,
          dy: a.offsetTop - s.offsetTop,
          ax: a.offsetLeft,
          ay: a.offsetTop + s.offsetHeight,
        });
    });
    const timers = [
      window.setTimeout(() => setStage("look"), 1750),
      window.setTimeout(() => setStage("hop"), 2800),
      window.setTimeout(() => setStage("done"), 3450),
    ];
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const bugAt = name.indexOf("i");
  let order = 0;
  const words = name.split(" ").map((word, w) => {
    const start = name.split(" ").slice(0, w).join(" ").length + (w ? 1 : 0);
    return (
      <span key={word} className="inline-block whitespace-nowrap">
        {word.split("").map((ch, j) => {
          const at = start + j;
          if (j === 0) return <span key={at} className="inline-block">{ch}</span>;
          if (at === bugAt) return <span key={at} ref={slot} className="name-i invisible inline-block">{ch}</span>;
          const delay = 0.15 + order++ * STEP;
          return (
            <motion.span
              key={at}
              className="inline-block origin-bottom"
              initial={{ y: -fall, opacity: 0 }}
              animate={{ y: [-fall, 0, 0, -22, 0, 0], opacity: 1, ...squash }}
              transition={{ duration: FALL, delay, times, opacity: { duration: 0.01, delay } }}
            >
              {ch}
            </motion.span>
          );
        })}
      </span>
    );
  });

  const bugDelay = 0.25 + order * STEP;
  const bug: TargetAndTransition = spot
    ? {
        drop: {
          opacity: 1,
          x: spot.dx,
          y: [spot.dy - fall, spot.dy, spot.dy, spot.dy - 22, spot.dy, spot.dy],
          ...squash,
          transition: { duration: FALL, delay: bugDelay, times, opacity: { duration: 0.01, delay: bugDelay } },
        },
        look: { x: spot.dx, y: spot.dy, rotate: [0, -16, 14, -16, 0], transition: { duration: 1 } },
        hop: {
          x: [spot.dx, spot.dx * 0.5, 0],
          y: [spot.dy, spot.dy * 0.5 - 190, 0],
          rotate: [0, -200, -360],
          scaleY: [0.8, 1.15, 1],
          scaleX: [1.15, 0.9, 1],
          transition: { duration: FALL, ease: "easeInOut" as const },
        },
        done: { x: 0, y: 0, rotate: -360 },
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
        <span ref={anchor} className="inline-block w-0" />
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
        className="absolute rounded-lg bg-void px-3 py-2 font-mono text-[13px] leading-none tracking-normal whitespace-nowrap text-[#dcff70]"
        style={{ left: spot ? spot.ax - 40 : 0, top: spot ? spot.ay + 12 : 0 }}
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
