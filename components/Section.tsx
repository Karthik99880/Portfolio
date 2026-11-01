"use client";

import { useCallback, useRef, type ReactNode } from "react";
import type { SectionHeading } from "@/lib/content/types";
import { offset } from "@/lib/motion";
import { revealTiming, rise, useRevealArmed } from "@/components/Reveal";

interface SectionProps {
  id: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  "aria-labelledby"?: string;
}

export function Section({ id, children, tone = "light", className = "", ...rest }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"] ?? `${id}-heading`}
      className={`section ${tone === "dark" ? "section--dark" : ""} ${className}`.trim()}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHead({
  kicker,
  heading,
  lede,
  id,
  className = "",
}: SectionHeading & { id: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const arm = useCallback((el: HTMLElement) => {
    const lines = [
      el.querySelector(".kicker")?.animate([{ transform: "scaleX(0)", offset: 0 }], { ...revealTiming(), pseudoElement: "::before" }),
      el.querySelector("[data-mask]")?.animate([{ transform: "translateY(105%)", offset: 0 }], revealTiming(0.08)),
      ((l) => l && rise(l, offset, 0.15))(el.querySelector("[data-lede]")),
    ];
    return lines.filter((a): a is Animation => !!a);
  }, []);
  useRevealArmed(ref, arm);

  return (
    <div ref={ref} className={`mb-[clamp(40px,6vw,64px)] ${className}`.trim()}>
      <span className="kicker">{kicker}</span>
      <h2 id={`${id}-heading`} className="display-lg mt-4 overflow-hidden pb-[0.08em] text-ink">
        <span data-mask className="block">
          {heading}
        </span>
      </h2>
      {lede ? (
        <p data-lede className="lede mt-5 max-w-[52ch]">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
