"use client";

import { useState, type CSSProperties } from "react";
import { useInterval } from "./hooks";

const STEPS = 30;
const SCENES: { label: string; bg: string; sub: CSSProperties }[] = [
  {
    label: "a lighthouse at dusk, cinematic",
    bg: "linear-gradient(180deg,#2b2140 0%,#9a4a5a 38%,#e98a4c 56%,#1c2333 57%,#0e1420 100%)",
    sub: {
      left: "46%",
      top: "24%",
      width: "9%",
      height: "34%",
      background: "linear-gradient(90deg,#f1e4d0,#c9b79a)",
      borderRadius: "3px 3px 0 0",
    },
  },
  {
    label: "a pine forest in fog, morning",
    bg: "linear-gradient(180deg,#c9d3c4 0%,#9fb39b 45%,#4e6b52 70%,#22382a 100%)",
    sub: {
      left: "10%",
      top: "38%",
      width: "80%",
      height: "40%",
      background: "#2d4a34",
      clipPath: "polygon(0 100%,5% 0,10% 100%,20% 0,26% 100%,44% 0,50% 100%,66% 0,72% 100%,86% 0,92% 100%)",
    },
  },
  {
    label: "a rainy street at night, neon",
    bg: "linear-gradient(180deg,#0d1020 0%,#1b1f3a 50%,#2a1e34 70%,#141018 100%)",
    sub: {
      left: "12%",
      top: "30%",
      width: "76%",
      height: "46%",
      background:
        "linear-gradient(90deg,#4fd67a 0 3%,transparent 3% 30%,#dcff70 30% 33%,transparent 33% 62%,#e8607a 62% 66%,transparent 66%)",
      opacity: 0.8,
      filter: "blur(1px)",
    },
  },
];

export function SdxlToy({ active, reduced, url }: { active: boolean; reduced: boolean; url: string }) {
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(STEPS);
  const [up, setUp] = useState(false);
  const [seed, setSeed] = useState(1);

  useInterval(() => setStep((s) => Math.min(STEPS, s + 1)), 70, active && !reduced && step < STEPS);

  const run = (next = scene) => {
    setScene(next);
    setUp(false);
    setSeed((s) => s + 1);
    setStep(reduced ? STEPS : 0);
  };
  const s = SCENES[scene];
  const left = STEPS - step;

  return (
    <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
      <span className="font-mono text-[10.5px] tracking-[0.14em] text-[#716c60]">{url.toUpperCase()}</span>
      <div className="grid gap-5 sm:grid-cols-[1fr_minmax(0,260px)]">
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#a39c90]">PROMPT</div>
          <div className="mt-2.5 flex flex-col gap-2" role="group" aria-label="Prompt">
            {SCENES.map((p, i) => (
              <button
                key={p.label}
                type="button"
                aria-pressed={i === scene}
                onClick={() => run(i)}
                className="toybtn text-left"
                style={i === scene ? { borderColor: "#dcff70", color: "#dcff70" } : undefined}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" className="toybtn toybtn--main" onClick={() => run()}>Generate</button>
            <button type="button" className="toybtn" disabled={step < STEPS} onClick={() => setUp(true)}>4× upscale</button>
          </div>
          <div className="mt-4 font-mono text-[11.5px] leading-[1.7] text-[#a39c90]" aria-live="polite">
            STEP {step} / {STEPS}
            <br />
            {up ? "4096 × 4096 · upscaled" : "1024 × 1024"}
            <br />
            CUDA · xFormers
          </div>
        </div>
        <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-[6px] bg-[#1d1a16]">
          <div
            className="absolute"
            style={{ inset: -20, background: s.bg, filter: `blur(${up ? 0 : left * 0.8 + 1.2}px)` }}
            role="img"
            aria-label={s.label}
          >
            <div className="absolute" style={s.sub} />
          </div>
          <svg className="absolute inset-0 h-full w-full" style={{ opacity: (left / STEPS) * 0.85 }} aria-hidden="true">
            <filter id="sdxl-noise">
              <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={seed} />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#sdxl-noise)" />
          </svg>
          {up ? (
            <div className="absolute bottom-2.5 right-2.5 rounded-[4px] bg-[#0c0a08] px-[7px] py-1 font-mono text-[10px] text-[#dcff70]">
              4096 × 4096
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
