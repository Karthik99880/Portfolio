"use client";

import { useState } from "react";

type Spot = [number, number];

const BACK_FOUR: Spot[] = [[80, 35], [72, 78], [72, 122], [80, 165]];
const SHAPES: Record<string, Spot[]> = {
  "4-3-3": [...BACK_FOUR, [140, 60], [130, 100], [140, 140], [215, 40], [230, 100], [215, 160]],
  "4-2-3-1": [...BACK_FOUR, [120, 78], [120, 122], [180, 40], [188, 100], [180, 160], [240, 100]],
  "4-4-2": [...BACK_FOUR, [150, 35], [142, 78], [142, 122], [150, 165], [225, 75], [225, 125]],
  "3-5-2": [[72, 55], [66, 100], [72, 145], [140, 25], [135, 65], [125, 100], [135, 135], [140, 175], [225, 75], [225, 125]],
};
const NAMES = Object.keys(SHAPES);
const KEEPER: Spot = [22, 100];

export function KopToy({ reduced }: { reduced: boolean }) {
  const [shape, setShape] = useState(NAMES[0]);
  const spots = [KEEPER, ...SHAPES[shape]];

  return (
    <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
      <span className="font-mono text-[10.5px] tracking-[0.14em] text-[#716c60]">TACTICS BOARD · PICK A SHAPE</span>
      <svg viewBox="0 0 300 200" role="img" aria-label={`Eleven players set out in a ${shape} formation`} className="w-full flex-1">
        <g fill="none" stroke="#3a352d" strokeWidth="1.2">
          <rect x="6" y="6" width="288" height="188" />
          <path d="M150 6 V194" />
          <circle cx="150" cy="100" r="24" />
          <rect x="6" y="52" width="42" height="96" />
          <rect x="252" y="52" width="42" height="96" />
        </g>
        {spots.map(([x, y], i) => (
          <circle
            key={i}
            r="7"
            fill={i === 0 ? "#fbfdf5" : "#c8102e"}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              transition: reduced ? "none" : `transform 0.7s cubic-bezier(.16,1,.3,1) ${i * 18}ms`,
            }}
          />
        ))}
      </svg>
      <div className="mt-auto flex flex-wrap gap-2">
        {NAMES.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={n === shape}
            className={`toybtn ${n === shape ? "toybtn--main" : ""}`}
            onClick={() => setShape(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
