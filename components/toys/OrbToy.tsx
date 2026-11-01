"use client";

import { useEffect, useRef, useState } from "react";

const R = 150;
const CX = 200;
const CY = 175;
const LATS = [-60, -30, 0, 30, 60];

export function OrbToy({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [rot, setRot] = useState(0.6);
  const [drag, setDrag] = useState(false);
  const [coast, setCoast] = useState(false);
  const vel = useRef(0);
  const last = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    if (!active || reduced) return;
    let raf = 0;
    const frame = () => {
      if (!dragging.current) {
        const v = vel.current;
        vel.current = Math.abs(v) < 0.0004 ? 0 : v * 0.94;
        setRot((r) => r + 0.004 + vel.current);
        setCoast(Math.abs(vel.current) > 0.002);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  const down = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    last.current = e.clientX;
    vel.current = 0;
    setDrag(true);
  };
  const move = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current;
    last.current = e.clientX;
    vel.current = Math.max(-0.08, Math.min(0.08, dx * 0.004));
    setRot((r) => r + dx * 0.012);
  };
  const up = () => {
    dragging.current = false;
    setDrag(false);
    if (reduced) vel.current = 0;
  };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setRot((r) => r - 0.15);
    else if (e.key === "ArrowRight") setRot((r) => r + 0.15);
  };

  const meridians = [0, 1, 2, 3, 4, 5].map((i) => Math.cos(rot + (i * Math.PI) / 6));
  const lon = (78.5 * Math.PI) / 180 + rot;
  const lat = (17.4 * Math.PI) / 180;
  const visible = Math.cos(lon) > 0;
  const px = CX + R * Math.cos(lat) * Math.sin(lon);
  const py = CY - R * Math.sin(lat);
  const deg = Math.round((((rot * 180) / Math.PI) % 360 + 360) % 360);
  const spin = drag ? "manual" : coast ? "coasting" : reduced ? "still" : "idle";

  return (
    <div
      role="group"
      aria-label="Earth globe. Drag or use the left and right arrow keys to spin."
      tabIndex={0}
      onKeyDown={key}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="toyfocus relative flex-1 min-h-[360px] select-none"
      style={{ cursor: drag ? "grabbing" : "grab", touchAction: "pan-y" }}
    >
      <div className="absolute left-5 top-5 font-mono text-[10.5px] tracking-[0.14em] text-[#716c60] sm:left-7 sm:top-7">HUD · EARTH</div>
      <div
        className="absolute right-5 top-5 font-mono text-[10.5px] tracking-[0.1em] sm:right-7 sm:top-7"
        style={{ color: drag ? "#dcff70" : "#716c60" }}
      >
        {drag ? "PINCH · SPINNING" : "OPEN HAND · IDLE"}
      </div>
      <svg viewBox="0 0 400 350" className="absolute inset-0 block h-full w-full" aria-hidden="true">
        <circle cx={CX} cy={CY} r={R} fill="#0f1a13" stroke="#1f7a3d" />
        {LATS.map((d) => {
          const r = (d * Math.PI) / 180;
          return (
            <ellipse
              key={d}
              cx={CX}
              cy={CY - R * Math.sin(r)}
              rx={R * Math.cos(r)}
              ry={R * Math.cos(r) * 0.16}
              fill="none"
              stroke="#1f7a3d"
              opacity={0.7}
            />
          );
        })}
        {meridians.map((c, i) => (
          <ellipse key={i} cx={CX} cy={CY} rx={Math.abs(c * R)} ry={R} fill="none" stroke="#4fd67a" opacity={0.25 + 0.6 * Math.abs(c)} />
        ))}
        {visible ? (
          <g transform={`translate(${px} ${py})`}>
            <circle r={12} fill="#dcff70" opacity={0.25} />
            <circle r={4.5} fill="#dcff70" />
            <text x={12} y={-8} fontFamily="var(--font-mono)" fontSize={11} fill="#dcff70">HYDERABAD · 31°</text>
          </g>
        ) : null}
      </svg>
      <div className="absolute bottom-5 left-5 font-mono text-[11px] text-[#a39c90] sm:bottom-6 sm:left-7">
        ROTATION {deg}° · SPIN {spin.toUpperCase()}
      </div>
    </div>
  );
}
