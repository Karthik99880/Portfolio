"use client";

import { useSyncExternalStore } from "react";

type Bus = { ctx: AudioContext; out: GainNode };

let bus: Bus | null = null;
const midi = (n: number) => 440 * 2 ** ((n - 69) / 12);

// One warm bus for everything: low-passed, with a soft echo so single notes ring out instead of clicking.
function audio(): Bus {
  if (!bus) {
    const ctx = new AudioContext();
    const out = ctx.createGain();
    const warm = ctx.createBiquadFilter();
    const echo = ctx.createDelay();
    const feedback = ctx.createGain();
    const wet = ctx.createGain();
    out.gain.value = 0.9;
    warm.type = "lowpass";
    warm.frequency.value = 1800;
    echo.delayTime.value = 0.33;
    feedback.gain.value = 0.3;
    wet.gain.value = 0.28;
    out.connect(warm).connect(ctx.destination);
    warm.connect(echo).connect(feedback).connect(echo);
    echo.connect(wet).connect(ctx.destination);
    bus = { ctx, out };
  }
  if (bus.ctx.state === "suspended") void bus.ctx.resume();
  return bus;
}

function voice(freq: number, at: number, gain: number, attack: number, length: number, type: OscillatorType, dest?: AudioNode) {
  const { ctx, out } = audio();
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, at);
  env.gain.linearRampToValueAtTime(gain, at + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(env).connect(dest ?? out);
  osc.start(at);
  osc.stop(at + length + 0.05);
}

const PENTATONIC = [62, 64, 66, 69, 71, 74, 76, 78, 81];

export function pluck(index: number, gain = 0.06) {
  const { ctx } = audio();
  const n = PENTATONIC[((index % PENTATONIC.length) + PENTATONIC.length) % PENTATONIC.length];
  voice(midi(n), ctx.currentTime, gain, 0.012, 1.6, "triangle");
  voice(midi(n + 12), ctx.currentTime, gain * 0.18, 0.012, 1.1, "sine");
}

function store(initial: boolean) {
  let value = initial;
  const subs = new Set<() => void>();
  return {
    get: () => value,
    set: (v: boolean) => {
      value = v;
      subs.forEach((f) => f());
    },
    subscribe: (f: () => void) => {
      subs.add(f);
      return () => {
        subs.delete(f);
      };
    },
  };
}

export const humStore = store(false);

export function useStore(s: ReturnType<typeof store>) {
  return useSyncExternalStore(s.subscribe, s.get, () => false);
}
