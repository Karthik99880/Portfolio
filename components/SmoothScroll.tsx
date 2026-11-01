"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function SmoothScroll() {
  return useReducedMotion() ? null : <ReactLenis root options={{ lerp: 0.1, anchors: true }} />;
}
