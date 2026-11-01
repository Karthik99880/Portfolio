"use client";

import { createElement, useCallback, useLayoutEffect, useRef, type HTMLAttributes, type RefObject } from "react";
import { inView } from "motion/react";
import { duration, easeCss, offset, stagger } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Tag = "div" | "section" | "ul" | "ol" | "li" | "span" | "p";
type Amount = "some" | "all" | number;

export const revealTiming = (delay = 0): KeyframeAnimationOptions => ({
  duration: duration.reveal * 1000,
  delay: delay * 1000,
  easing: easeCss,
  fill: "backwards",
});

export const rise = (el: Element, y = offset, delay = 0) =>
  el.animate([{ opacity: 0, transform: `translateY(${y}px)`, offset: 0 }], revealTiming(delay));

// Arms paused WAAPI animations only for elements starting below the fold; cancelling them restores the SSR state.
export function useRevealArmed(ref: RefObject<HTMLElement | null>, arm: (el: HTMLElement) => Animation[], amount: Amount = "some") {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
    const anims = arm(el);
    anims.forEach((a) => a.pause());
    const stop = inView(el, () => anims.forEach((a) => a.play()), { amount, margin: "0px 0px -10% 0px" });
    return () => {
      stop();
      anims.forEach((a) => a.cancel());
    };
  }, [ref, arm, amount, reduced]);
}

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: Tag;
  delay?: number;
  y?: number;
  amount?: Amount;
}

export function Reveal({ as = "div", delay = 0, y = offset, amount, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const arm = useCallback((el: HTMLElement) => [rise(el, y, delay)], [y, delay]);
  useRevealArmed(ref, arm, amount);
  const El = as as "div";
  return <El ref={ref as RefObject<HTMLDivElement>} {...rest} />;
}

export function RevealGroup({ as = "div", delay = 0, y = offset, step = stagger, amount, ...rest }: RevealProps & { step?: number }) {
  const ref = useRef<HTMLElement>(null);
  const arm = useCallback(
    (el: HTMLElement) => Array.from(el.querySelectorAll("[data-reveal-item]"), (item, i) => rise(item, y, delay + i * step)),
    [y, delay, step],
  );
  useRevealArmed(ref, arm, amount);
  const El = as as "div";
  return <El ref={ref as RefObject<HTMLDivElement>} {...rest} />;
}

export function RevealItem({ as = "div", ...rest }: HTMLAttributes<HTMLElement> & { as?: Tag }) {
  return createElement(as, { ...rest, "data-reveal-item": "" } as HTMLAttributes<HTMLElement>);
}
