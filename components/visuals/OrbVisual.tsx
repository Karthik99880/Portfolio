import type { OrbVisual as OrbVisualContent } from "@/lib/content";
import styles from "../Projects.module.css";

interface Props {
  visual: OrbVisualContent;
  label: string;
  active: boolean;
}

const TICKS = Array.from({ length: 36 }, (_, i) => i * 10);
const LATITUDES = [
  { cy: 80, rx: 42, ry: 13 },
  { cy: 110, rx: 60, ry: 18 },
  { cy: 140, rx: 42, ry: 13 },
];

export function OrbVisual({ visual, label, active }: Props) {
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
      <div className={`${styles.screen} ${styles.orbScreen}`}>
        <div className={styles.orbStage}>
          <svg className={styles.orbSvg} viewBox="0 0 220 220" aria-hidden="true">
            <g className={styles.orbHud}>
              {TICKS.map((deg) => (
                <line
                  key={deg}
                  className={styles.orbTick}
                  x1="110"
                  y1="18"
                  x2="110"
                  y2={deg % 90 === 0 ? "26" : "22"}
                  transform={`rotate(${deg} 110 110)`}
                />
              ))}
            </g>
            <g transform="rotate(-16 110 110)">
              <circle className={styles.orbRing} cx="110" cy="110" r="60" />
              {LATITUDES.map((lat) => (
                <ellipse key={lat.cy} className={styles.orbLine} cx="110" cy={lat.cy} rx={lat.rx} ry={lat.ry} />
              ))}
              <ellipse className={`${styles.orbLine} ${styles.orbMeridian}`} cx="110" cy="110" rx="60" ry="60" />
              <ellipse className={`${styles.orbLine} ${styles.orbMeridian}`} cx="110" cy="110" rx="30" ry="60" />
              <ellipse className={`${styles.orbLine} ${styles.orbMeridian}`} cx="110" cy="110" rx="4" ry="60" />
              <ellipse className={styles.orbAccent} cx="110" cy="110" rx="0.5" ry="60" />
            </g>
          </svg>
          <svg className={styles.orbHand} viewBox="0 0 40 40" aria-hidden="true">
            <path className={`${styles.orbFinger} ${styles.orbFingerA}`} d="M8 10c4-2 9-1 12 3l4 5" />
            <path className={`${styles.orbFinger} ${styles.orbFingerB}`} d="M32 30c-4 2-9 1-12-3l-4-5" />
          </svg>
        </div>
        <div className={styles.orbCaption}>{visual.caption}</div>
      </div>
    </div>
  );
}
