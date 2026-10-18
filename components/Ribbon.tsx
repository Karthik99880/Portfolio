export const LEAF = "#4fd67a";
export const RIBBON_ID = "hero-ribbon";

export function RibbonFar() {
  return (
    <g fill="none" stroke={LEAF} strokeLinecap="round">
      <path d="M 860 -60 C 740 180, 1100 300, 950 520 S 690 760, 1000 900" strokeWidth="130" />
      <path d="M 420 -40 C 480 120, 320 220, 450 380" strokeWidth="84" />
    </g>
  );
}

export function RibbonNear() {
  return (
    <g fill={LEAF}>
      <path
        d="M -80 190 C 180 40, 380 330, 630 170 S 1010 30, 1360 230"
        fill="none"
        stroke={LEAF}
        strokeWidth="112"
        strokeLinecap="round"
      />
      <path d="M 1060 560 C 1160 470, 1320 520, 1300 640 C 1280 760, 1110 760, 1080 680 Z" />
      <path d="M 140 330 C 210 300, 260 360, 220 410 C 180 450, 110 420, 120 380 Z" />
    </g>
  );
}

// Same 1280x800 box as the intro's shapes, so the intro can shrink onto it with a uniform scale.
export function HeroRibbon() {
  return (
    <svg
      id={RIBBON_ID}
      aria-hidden="true"
      viewBox="0 0 1280 800"
      className="pointer-events-none absolute top-1/2 left-1/2 aspect-[1280/800] w-[125%] -translate-x-1/2 -translate-y-1/2 opacity-45"
    >
      <RibbonFar />
      <RibbonNear />
    </svg>
  );
}
