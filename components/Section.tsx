"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { SectionHeading } from "@/lib/content/types";

interface SectionProps {
  id: string;
  children: ReactNode;
  tone?: "light" | "dark";
  reveal?: boolean;
  className?: string;
  "aria-labelledby"?: string;
}

// Renders visible on the server; only elements below the fold get the fade-up, so nothing is ever parked invisible.
export function Section({ id, children, tone = "light", reveal = true, className = "", ...rest }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !reveal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    el.dataset.reveal = "out";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal]);

  return (
    <section
      ref={ref}
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
  return (
    <div className={`mb-[clamp(40px,6vw,64px)] ${className}`.trim()}>
      <span className="kicker">{kicker}</span>
      <h2 id={`${id}-heading`} className="display-lg mt-5 text-ink">
        {heading}
      </h2>
      {lede ? <p className="lede mt-5 max-w-[52ch]">{lede}</p> : null}
    </div>
  );
}
