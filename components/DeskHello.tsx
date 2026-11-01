"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import DeskScene, { type DeskPose } from "@/components/DeskScene";
import { useIntro } from "@/components/IntroHandoff";
import { heroLines, music, reaction } from "@/lib/content";
import type { ReactionGame } from "@/lib/content/types";
import type { Track } from "@/lib/spotify";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Stage = "typing" | "squash" | "front" | "wave" | "ask" | "talk" | "nod" | "unsquash" | "game";
type LineKey = keyof typeof heroLines;

export const REACTION_OPEN = "reaction:open";
const SEEN_KEY = "desk-hello";
const pop = { initial: { opacity: 0, y: 8, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 6, scale: 0.96 } };
const popEase = { duration: 0.32, ease: [0.22, 1, 0.36, 1] } as const;
const bubble = "absolute top-[2%] left-[40%] z-10 w-[min(252px,58%)] rounded-[14px] bg-ink px-[18px] py-4 text-paper";

const padStyle: Record<ReactionGame, { bg: string; fg: string; ring: number }> = {
  ready: { bg: "#dcff70", fg: "#0c0a08", ring: 10 },
  wait: { bg: "#2a2621", fg: "#8d877a", ring: 0 },
  go: { bg: "#4fd67a", fg: "#0c0a08", ring: 22 },
  result: { bg: "#1d1a16", fg: "#fbfdf5", ring: 0 },
  early: { bg: "#3a1d18", fg: "#ffb3a8", ring: 0 },
};

function verdictFor(ms: number, best: number | null) {
  if (best !== null && ms < best) return reaction.best;
  return reaction.verdicts.find((v) => ms < v.under)!.text.replace("{ms}", String(ms));
}

function Tail() {
  return (
    <svg aria-hidden="true" width="22" height="14" viewBox="0 0 22 14" className="absolute -bottom-3 left-[18px]">
      <path d="M0 0 L22 0 L4 14 Z" fill="var(--color-ink)" />
    </svg>
  );
}

export default function DeskHello({ tracks }: { tracks: Track[] }) {
  const { stage: intro } = useIntro();
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [stage, setStage] = useState<Stage>("typing");
  const [game, setGame] = useState<ReactionGame | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [player, setPlayer] = useState(false);
  const [pick, setPick] = useState(0);
  const [ms, setMs] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [verdict, setVerdict] = useState("");
  const timers = useRef<number[]>([]);
  const goTimer = useRef(0);
  const t0 = useRef(0);
  const free = useRef(true);
  const padRef = useRef<HTMLButtonElement>(null);

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const run = useCallback(
    (steps: [number, Stage][]) => {
      clear();
      steps.forEach(([at, s]) => timers.current.push(window.setTimeout(() => setStage(s), at)));
    },
    [clear],
  );

  const openGame = useCallback(() => {
    clear();
    window.clearTimeout(goTimer.current);
    setLine(null);
    setStage("game");
    setGame("ready");
    setVerdict("");
  }, [clear]);

  const bye = useCallback(() => {
    window.clearTimeout(goTimer.current);
    setGame(null);
    run(reduced ? [[0, "typing"]] : [[0, "nod"], [500, "unsquash"], [760, "typing"]]);
  }, [reduced, run]);

  const say = useCallback(
    (key: LineKey) => {
      try {
        if (window.sessionStorage.getItem(`line-${key}`)) return;
        window.sessionStorage.setItem(`line-${key}`, "1");
      } catch {}
      setLine(heroLines[key]);
      run(reduced ? [[0, "talk"], [4600, "typing"]] : [[0, "squash"], [260, "talk"], [4600, "unsquash"], [4860, "typing"]]);
      timers.current.push(window.setTimeout(() => setLine(null), 4400));
    },
    [reduced, run],
  );

  useEffect(() => {
    free.current = stage === "typing" && !game && !player;
  }, [stage, game, player]);

  // Waits for the intro to finish (stage settles on idle), then says hello once per visit.
  useEffect(() => {
    if (intro !== "idle") return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => {
      if (window.scrollY > window.innerHeight * 0.5) return;
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      run(reduced ? [[0, "ask"]] : [[0, "squash"], [260, "front"], [500, "wave"], [2100, "ask"]]);
    }, 1400);
    return () => window.clearTimeout(t);
  }, [intro, reduced, run]);

  // A welcome when someone lingers on the hero, and a thank-you when they come back up after reading.
  useEffect(() => {
    if (intro !== "idle") return;
    const hero = document.getElementById("opening");
    const work = document.getElementById("work");
    const end = document.getElementById("contact");
    if (!hero) return;
    const reached = { work: false, contact: false };
    let heroIn = true;
    let left = false;
    let back = 0;
    let still = performance.now();
    const armIdle = () => {
      still = performance.now();
    };
    let wasFree = free.current;
    const idle = window.setInterval(() => {
      if (free.current && !wasFree) still = performance.now();
      wasFree = free.current;
      if (heroIn && free.current && performance.now() - still > 6000) say("welcome");
    }, 1000);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.target !== hero) {
            if (e.isIntersecting) reached[e.target === work ? "work" : "contact"] = true;
            return;
          }
          heroIn = e.intersectionRatio >= 0.5;
          if (!heroIn) {
            left = true;
            return;
          }
          armIdle();
          if (left && (reached.work || reached.contact))
            back = window.setTimeout(() => heroIn && free.current && say(reached.contact ? "backFromContact" : "backFromWork"), 700);
        }),
      { threshold: [0, 0.5] },
    );
    [hero, work, end].forEach((el) => el && io.observe(el));
    const onScroll = () => heroIn && armIdle();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(idle);
      window.clearTimeout(back);
    };
  }, [intro, say]);

  useEffect(() => {
    const open = () => {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      openGame();
    };
    window.addEventListener(REACTION_OPEN, open);
    return () => window.removeEventListener(REACTION_OPEN, open);
  }, [lenis, openGame, reduced]);

  useEffect(() => {
    if (game === "ready") padRef.current?.focus({ preventScroll: true });
  }, [game]);

  useEffect(
    () => () => {
      clear();
      window.clearTimeout(goTimer.current);
    },
    [clear],
  );

  const shuffle = () =>
    setPick((p) => {
      if (tracks.length < 2) return 0;
      let n = p;
      while (n === p) n = Math.floor(Math.random() * tracks.length);
      return n;
    });

  const press = () => {
    if (game === "ready" || game === "result" || game === "early") {
      setGame("wait");
      setVerdict("");
      goTimer.current = window.setTimeout(() => {
        t0.current = performance.now();
        setGame("go");
      }, 1300 + Math.random() * 2400);
      return;
    }
    if (game === "wait") {
      window.clearTimeout(goTimer.current);
      setGame("early");
      setVerdict(reaction.early);
      return;
    }
    if (game === "go") {
      const took = Math.round(performance.now() - t0.current);
      setMs(took);
      setVerdict(verdictFor(took, best));
      setBest((b) => (b === null ? took : Math.min(b, took)));
      setTries((n) => n + 1);
      setGame("result");
    }
  };

  const backTurned = stage === "typing" || stage === "squash" || stage === "unsquash";
  const pose: DeskPose = {
    facing: backTurned ? "back" : "front",
    squash: stage === "squash" || stage === "unsquash",
    waving: stage === "wave",
    smiling: !backTurned && stage !== "front",
  };
  const asking = stage === "ask" && !game;
  const talking = stage === "talk" && !!line;
  const pad = game ? padStyle[game] : padStyle.ready;
  const [big, small] = game ? reaction.pad[game] : reaction.pad.ready;
  const track = tracks[pick];
  const src = track
    ? `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`
    : `https://open.spotify.com/embed/playlist/${music.playlistId}?utm_source=generator&theme=0`;

  return (
    <>
      <div className="relative">
        <DeskScene className="relative w-full" pose={pose} />

        <AnimatePresence>
          {player ? (
            <motion.div
              key="player"
              {...pop}
              transition={popEase}
              className="absolute right-[3%] bottom-[calc(3%+48px)] z-10 w-[min(340px,94%)] rounded-[14px] bg-void p-2.5 text-paper shadow-[0_18px_40px_rgba(12,10,8,0.18)]"
            >
              <iframe
                key={src}
                title={music.playerLabel}
                src={src}
                width="100%"
                height={track ? 80 : 152}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="block rounded-[10px] border-0"
              />
              <div className="mt-2 flex items-center justify-between gap-2 px-1">
                {tracks.length > 1 ? (
                  <button
                    type="button"
                    onClick={shuffle}
                    className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-full border border-[#2f2b25] bg-transparent px-3 font-mono text-[11px] tracking-[0.08em] text-paper uppercase hover:border-lime"
                  >
                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                    </svg>
                    {music.shuffle}
                  </button>
                ) : (
                  <span />
                )}
                <span className="flex items-center gap-1">
                  <a
                    href={`https://open.spotify.com/playlist/${music.playlistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center px-2 font-mono text-[11px] tracking-[0.08em] text-[#c9c3b8] uppercase hover:text-lime"
                  >
                    {music.fullPlaylist}
                  </a>
                  <button
                    type="button"
                    aria-label={music.close}
                    onClick={() => setPlayer(false)}
                    className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#2f2b25] bg-transparent text-[#a39c90] hover:text-paper"
                  >
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M2 2 L10 10 M10 2 L2 10" />
                    </svg>
                  </button>
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={player}
          onClick={() => {
            if (!player && tracks.length) setPick(Math.floor(Math.random() * tracks.length));
            setPlayer(!player);
          }}
          className="absolute right-[3%] bottom-[3%] z-[5] inline-flex min-h-10 max-w-[94%] cursor-pointer items-center gap-2 rounded-full border border-line bg-paper/90 px-3.5 font-mono text-[11px] tracking-[0.06em] text-ink backdrop-blur-sm transition-colors hover:border-ink min-[900px]:min-h-9"
        >
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <span className="truncate">{music.listen}</span>
        </button>
      </div>

      <AnimatePresence>
        {asking ? (
          <motion.div key="ask" {...pop} transition={popEase} style={{ transformOrigin: "12% 100%" }} className={bubble}>
            <p role="status" className="m-0 text-[15px] leading-[1.4] font-semibold">
              {reaction.ask}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={openGame}
                className="inline-flex min-h-10 cursor-pointer items-center rounded-full border-0 bg-lime px-4 font-mono text-[11.5px] tracking-[0.1em] text-ink uppercase"
              >
                {reaction.yes}
              </button>
              <button
                type="button"
                onClick={bye}
                className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-[#3a352d] bg-transparent px-4 font-mono text-[11.5px] tracking-[0.1em] text-[#c9c3b8] uppercase hover:text-paper"
              >
                {reaction.later}
              </button>
            </div>
            <Tail />
          </motion.div>
        ) : talking ? (
          <motion.div key={line} {...pop} transition={popEase} style={{ transformOrigin: "12% 100%" }} className={bubble}>
            <p role="status" className="m-0 text-[15px] leading-[1.4] font-semibold">
              {line}
            </p>
            <Tail />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {game ? (
          <motion.section
            key="game"
            aria-label={reaction.title}
            {...pop}
            transition={popEase}
            className="relative z-10 mx-auto mt-4 w-full max-w-[300px] rounded-[16px] bg-void px-5 pt-[18px] pb-5 text-paper shadow-[0_18px_40px_rgba(12,10,8,0.18)] min-[900px]:absolute min-[900px]:top-0 min-[900px]:left-[42%] min-[900px]:mt-0 min-[900px]:w-[min(300px,100%)] min-[900px]:translate-x-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-[#a39c90] uppercase">{reaction.title}</span>
              <button
                type="button"
                aria-label={reaction.close}
                onClick={bye}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#2f2b25] bg-transparent text-[#a39c90] hover:text-paper min-[900px]:size-8"
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M2 2 L10 10 M10 2 L2 10" />
                </svg>
              </button>
            </div>
            <p className="m-0 mt-2.5 text-[13.5px] leading-[1.45] text-[#c9c3b8]">{game === "go" ? reaction.now : reaction.hint}</p>
            <div className="mt-[18px] mb-1.5 flex justify-center">
              <button
                ref={padRef}
                type="button"
                onPointerDown={press}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!e.repeat) press();
                  }
                }}
                className="flex size-[132px] cursor-pointer flex-col items-center justify-center gap-1 rounded-full border-0 font-mono text-[11px] tracking-[0.12em] uppercase transition-[background-color,box-shadow,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime active:scale-[0.97]"
                style={{ background: pad.bg, color: pad.fg, boxShadow: `0 0 0 ${pad.ring}px rgba(220,255,112,0.18)` }}
              >
                <span className="font-display text-[34px] font-bold tracking-[-0.02em] normal-case">{big.replace("{ms}", String(ms))}</span>
                <span>{small}</span>
              </button>
            </div>
            <p aria-live="polite" className="m-0 mt-2.5 min-h-[42px] text-center text-[14.5px] leading-[1.45] text-lime">
              {verdict}
            </p>
            <div className="mt-1.5 flex justify-between border-t border-[#2a2621] pt-2.5 font-mono text-[11px] text-[#8d877a] uppercase">
              <span>
                {reaction.bestLabel} · {best === null ? "—" : `${best} ms`}
              </span>
              <span>
                {reaction.triesLabel} · {tries}
              </span>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
