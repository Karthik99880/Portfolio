"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CipherVisual as CipherVisualContent } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "../Projects.module.css";

interface Props {
  visual: CipherVisualContent;
  label: string;
  active: boolean;
}

type Phase = "idle" | "typing" | "sealed" | "wire" | "received" | "done";

const TYPE_MS = 40;
const WIRE_MS = 900;

// Deterministic stand-in ciphertext so server and client render the same bytes.
function toHex(text: string): string {
  let h = 0x2f;
  return Array.from(text, (ch, i) => {
    h = (h * 31 + ch.charCodeAt(0) + i * 7) & 0xff;
    return h.toString(16).padStart(2, "0");
  }).join(" ");
}

function Lock({ on }: { on: boolean }) {
  return (
    <svg className={styles.lock} data-on={on} viewBox="0 0 12 12" aria-hidden="true">
      <rect x="2" y="5.5" width="8" height="5.5" rx="1" fill="currentColor" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function CipherVisual({ visual, label, active }: Props) {
  const reducedMotion = useReducedMotion();
  const hex = useMemo(() => toHex(visual.plaintext), [visual.plaintext]);
  const [typed, setTyped] = useState(0);
  const [decrypted, setDecrypted] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const started = useRef(false);
  const total = visual.plaintext.length;

  useEffect(() => {
    if (!active || started.current || reducedMotion) return;
    started.current = true;
    const timers: number[] = [];
    let n = 0;
    const typer = window.setInterval(() => {
      n += 1;
      if (n === 1) setPhase("typing");
      setTyped(n);
      if (n >= total) {
        window.clearInterval(typer);
        timers.push(window.setTimeout(() => setPhase("sealed"), 300));
        timers.push(window.setTimeout(() => setPhase("wire"), 800));
        timers.push(window.setTimeout(() => setPhase("received"), 800 + WIRE_MS));
        timers.push(
          window.setTimeout(() => {
            let d = 0;
            const dec = window.setInterval(() => {
              d += 1;
              setDecrypted(d);
              if (d >= total) {
                window.clearInterval(dec);
                timers.push(window.setTimeout(() => setPhase("done"), 200));
              }
            }, 20);
            timers.push(dec);
          }, 800 + WIRE_MS + 400),
        );
      }
    }, TYPE_MS);
    timers.push(typer);
    return () => {
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, [active, reducedMotion, total]);

  const skip = reducedMotion && active;
  const shown = skip ? "done" : phase;
  const typedCount = skip ? total : typed;
  const decryptedCount = skip ? total : decrypted;
  const sealed = shown === "sealed" || shown === "wire" || shown === "received" || shown === "done";
  const received = shown === "received" || shown === "done";

  return (
    <div className={`${styles.frame} ${active ? styles.active : ""}`}>
      <div className={styles.chrome}>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {label}
      </div>
      <div className={`${styles.screen} ${styles.cipherScreen}`} aria-live="off">
        <div className={styles.pane}>
          <div className={styles.paneHead}>
            <span>{visual.clients[0]}</span>
            <Lock on={sealed} />
          </div>
          <div className={styles.paneLine}>
            <span className={styles.prompt}>&gt; </span>
            {visual.plaintext.slice(0, typedCount)}
            {shown === "typing" ? <span className={styles.cursor} aria-hidden="true" /> : null}
          </div>
          <div className={styles.paneHex} data-on={sealed}>
            aes ▸ {hex}
          </div>
        </div>
        <div className={styles.wire} aria-hidden="true">
          <span className={styles.wirePacket} data-on={shown === "wire"}>
            {hex.slice(0, 8)}
          </span>
        </div>
        <div className={styles.pane}>
          <div className={styles.paneHead}>
            <span>{visual.clients[1]}</span>
            <Lock on={shown === "done"} />
          </div>
          <div className={styles.paneHex} data-on={received}>
            aes ▸ {hex}
          </div>
          <div className={styles.paneLine}>
            {received ? (
              <>
                <span className={styles.prompt}>&gt; </span>
                {visual.plaintext.slice(0, decryptedCount)}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
