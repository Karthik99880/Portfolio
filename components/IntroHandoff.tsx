"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { LayoutGroup, motion } from "motion/react";

export type IntroStage = "idle" | "playing" | "handoff";

const IntroContext = createContext<{ stage: IntroStage; setStage: (stage: IntroStage) => void }>({
  stage: "idle",
  setStage: () => {},
});

export const useIntro = () => useContext(IntroContext);

export const HERO_NAME_ID = "hero-name";
export const handoffTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const;

export function IntroProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<IntroStage>("idle");
  return (
    <IntroContext value={{ stage, setStage }}>
      <LayoutGroup>{children}</LayoutGroup>
    </IntroContext>
  );
}

// The i gets its own box so it can misbehave in the intro and wobble on hover.
export function NameText({ name }: { name: string }) {
  const i = name.indexOf("i");
  if (i < 0) return name;
  const start = name.lastIndexOf(" ", i) + 1;
  const end = name.indexOf(" ", i) < 0 ? name.length : name.indexOf(" ", i);
  return (
    <>
      {name.slice(0, start)}
      <span className="whitespace-nowrap">
        {name.slice(start, i)}
        <span className="name-i inline-block">{name[i]}</span>
        {name.slice(i + 1, end)}
      </span>
      {name.slice(end)}
    </>
  );
}

export function HeroName({ name }: { name: string }) {
  const { stage } = useIntro();
  if (stage === "playing")
    return (
      <span className="block opacity-0">
        <NameText name={name} />
      </span>
    );
  // Lifted above the fading intro overlay while it flies in from the intro's position.
  return (
    <motion.span
      layoutId={HERO_NAME_ID}
      transition={handoffTransition}
      className={`block ${stage === "handoff" ? "relative z-[52]" : ""}`}
    >
      <NameText name={name} />
    </motion.span>
  );
}
