"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/content";

const START = { a: 312, b: 288, races: 4 };

export function PitWallToy({ image, href }: { image: ProjectImage; href: string | null }) {
  const [{ a, b, races }, set] = useState(START);
  const gap = a - b;
  const avail = races * 25;
  const clinched = Math.abs(gap) > avail;
  const verdict = clinched
    ? `${gap > 0 ? "Leader" : "Chaser"} clinches the title.`
    : `${gap >= 0 ? "Chaser" : "Leader"} can still win it.`;
  const sub = `Gap ${Math.abs(gap)} with ${avail} points still on the table.`;
  const max = Math.max(a, b) + 25;
  const win = (leader: boolean) =>
    set((s) => ({
      races: Math.max(0, s.races - 1),
      a: s.a + (leader ? 25 : 18),
      b: s.b + (leader ? 18 : 25),
    }));
  const rows = [
    { name: "Leader", pts: a, color: "#4fd67a" },
    { name: "Chaser", pts: b, color: "#dcff70" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-[#716c60]">
          CHAMPIONSHIP PREDICTOR · SAMPLE NUMBERS
        </span>
        <a
          href={href ?? image.src}
          target="_blank"
          rel="noopener noreferrer"
          className="toyfocus hidden min-h-11 min-[900px]:min-h-0 shrink-0 items-center gap-2 font-mono text-[10.5px] text-[#a39c90] hover:text-[#dcff70] sm:flex"
        >
          <Image src={image.src} alt="" width={image.width} height={image.height} className="h-8 w-auto rounded-[3px]" />
          see the real thing
        </a>
      </div>
      <div className="flex flex-col gap-3.5">
        {rows.map((r) => (
          <div key={r.name}>
            <div className="flex justify-between text-[15px] font-semibold">
              <span>{r.name}</span>
              <span className="font-mono">{r.pts} pts</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-[3px] bg-[#1d1a16]">
              <div className="toybar h-full w-full origin-left" style={{ transform: `scaleX(${r.pts / max})`, background: r.color }} />
            </div>
          </div>
        ))}
      </div>
      <label className="flex items-center gap-4 font-mono text-[11px] text-[#a39c90]">
        <span className="w-[110px] shrink-0">RACES LEFT · {races}</span>
        <input
          type="range"
          min={0}
          max={10}
          value={races}
          onChange={(e) => set((s) => ({ ...s, races: Number(e.target.value) }))}
          className="toyfocus min-w-0 flex-1 accent-[#4fd67a]"
        />
      </label>
      <div aria-live="polite">
        <div
          className="font-display text-[22px] font-semibold leading-tight sm:text-[24px]"
          style={{ color: clinched ? "#dcff70" : "#fbfdf5" }}
        >
          {verdict}
        </div>
        <div className="mt-1.5 font-mono text-[11.5px] text-[#a39c90]">{sub}</div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        <button type="button" className="toybtn" onClick={() => win(true)}>Leader wins next</button>
        <button type="button" className="toybtn" onClick={() => win(false)}>Chaser wins next</button>
        <button type="button" className="toybtn" onClick={() => set(START)}>Reset</button>
      </div>
    </div>
  );
}
