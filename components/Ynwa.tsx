"use client";

import { useEffect, useState, type ReactNode } from "react";

const WORD = "ynwa";
const RED = { "--color-lime": "#ff6b7d", "--color-leaf": "#e8384f", "--color-accent": "#c8102e" };
const HOLD_MS = 7000;
const EVENT = "ynwa";
const fire = () => window.dispatchEvent(new Event(EVENT));

export function YnwaButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={fire}>
      {children}
    </button>
  );
}

export function YnwaShirt({ children }: { children: ReactNode }) {
  return (
    <g onClick={fire} style={{ cursor: "pointer", pointerEvents: "auto" }}>
      {children}
    </g>
  );
}

export default function Ynwa() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let typed = "";
    let timer: ReturnType<typeof setTimeout> | undefined;
    const root = document.documentElement;
    const clear = () => {
      for (const k of Object.keys(RED)) root.style.removeProperty(k);
      setOn(false);
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey || t?.closest("input, textarea, select, [contenteditable]")) return;
      typed = (typed + e.key.toLowerCase()).slice(-WORD.length);
      if (typed !== WORD) return;
      typed = "";
      turnRed();
    };
    const turnRed = () => {
      for (const [k, v] of Object.entries(RED)) root.style.setProperty(k, v);
      setOn(true);
      clearTimeout(timer);
      timer = setTimeout(clear, HOLD_MS);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(EVENT, turnRed);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVENT, turnRed);
      clearTimeout(timer);
      clear();
    };
  }, []);

  return (
    <p
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] m-0 -translate-x-1/2 bg-ink px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-paper uppercase transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
    >
      {on ? "You’ll Never Walk Alone" : ""}
    </p>
  );
}
