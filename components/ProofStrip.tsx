"use client";

import { useEffect, useRef } from "react";
import { animate, inView } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { ProofStat } from "@/lib/content/types";

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const text = ref.current?.firstChild;
    if (!text || reduced) return;
    let run: { stop: () => void } | undefined;
    const stop = inView(ref.current!, () => {
      run?.stop();
      text.nodeValue = "0";
      run = animate(0, to, { duration: 1.2, delay: 0.3, ease, onUpdate: (v) => (text.nodeValue = String(Math.round(v))) });
    });
    return () => {
      stop();
      run?.stop();
      text.nodeValue = String(to);
    };
  }, [to, reduced]);
  return <span ref={ref}>{to}</span>;
}

export default function ProofStrip({ stats }: { stats: ProofStat[] }) {
  return (
    <Reveal as="ul" className="m-0 mt-14 grid list-none grid-cols-2 border-y border-line p-0 min-[760px]:grid-cols-4">
      {stats.map((s, i) => (
        <li
          key={s.label}
          className={`py-5 pr-4 ${i % 2 ? "border-l border-line pl-6" : ""} ${i > 1 ? "border-t border-line min-[760px]:border-t-0" : ""} ${i ? "min-[760px]:border-l min-[760px]:border-line min-[760px]:pl-6" : ""}`}
        >
          <div className={`font-display text-[clamp(26px,3.4vw,34px)] leading-[1.15] font-bold tracking-[-0.02em] ${s.accent ? "text-accent" : "text-ink"}`}>
            {s.count !== undefined ? <Count to={s.count} /> : s.value}
            {s.unit ? <span className="text-[0.6em] font-medium text-muted">{s.unit}</span> : null}
          </div>
          <div className="text-[14px] leading-[1.4] text-muted">{s.label}</div>
        </li>
      ))}
    </Reveal>
  );
}
