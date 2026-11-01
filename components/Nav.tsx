"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { contact, siteConfig } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

const links = ["about", "experience", "skills", "work"] as const;
const watched: Record<string, string> = { about: "about", experience: "experience", skills: "skills", work: "work", achievements: "work" };

const linkClass =
  "inline-flex min-h-[40px] items-center gap-[7px] px-[11px] font-mono text-[11.5px] uppercase tracking-[0.1em] transition-colors duration-300 hover:text-ink focus-visible:text-ink";

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) > 4) setHidden(y > prev && y > 120);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(watched[e.target.id] ?? "")),
      { rootMargin: "-45% 0px -55% 0px" },
    );
    ["opening", ...Object.keys(watched), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out ${hidden ? "max-[699px]:-translate-y-full" : ""}`}
    >
      {!reduced && (
        <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="h-0.5 origin-left bg-accent" />
      )}
      <div className="container mt-3">
        <nav
          aria-label="Primary"
          className={`pointer-events-auto flex h-14 items-center justify-between rounded-full border px-2 transition-colors duration-300 ${scrolled ? "border-line bg-paper/95" : "border-transparent bg-transparent"}`}
        >
          <a
            href="#main"
            aria-label={siteConfig.name}
            className="inline-flex size-10 items-center justify-center rounded-full bg-ink font-display text-[14px] font-bold text-paper transition-colors duration-300 hover:bg-accent focus-visible:bg-accent"
          >
            {siteConfig.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </a>
          <div className="flex items-center">
            <ul className="m-0 hidden list-none items-center p-0 min-[700px]:flex">
              {links.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={active === id ? "location" : undefined} className={`${linkClass} ${active === id ? "text-ink" : "text-muted"}`}>
                    <b
                      aria-hidden="true"
                      className={`size-1.5 rounded-full bg-accent transition-transform duration-[350ms] ${active === id ? "scale-100" : "scale-0"}`}
                    />
                    {id}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="ml-2 inline-flex h-10 items-center rounded-full bg-accent px-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:bg-ink focus-visible:bg-ink"
            >
              {contact.navLabel}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
