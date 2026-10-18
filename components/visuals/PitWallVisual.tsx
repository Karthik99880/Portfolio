import Image from "next/image";
import type { PitWallVisual as PitWallVisualContent } from "@/lib/content";
import styles from "../Projects.module.css";

interface Props {
  visual: PitWallVisualContent;
  label: string;
  active: boolean;
}

export function PitWallVisual({ visual, label, active }: Props) {
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
      <div className={styles.screen}>
        <Image
          src={visual.image.src}
          alt={visual.image.alt}
          fill
          sizes="(max-width: 760px) 100vw, 560px"
          className={styles.pwImage}
        />
        <div className={styles.pwStreak} aria-hidden="true" />
        <svg className={styles.pwCar} viewBox="0 0 72 22" aria-hidden="true" fill="var(--color-petronas)">
          <rect x="0" y="3" width="4" height="10" rx="1" />
          <path d="M4 11h6l5-4h15l6-4h12l6 4h10l6 3v3H4z" />
          <circle cx="17" cy="15.5" r="4.5" />
          <circle cx="55" cy="15.5" r="4.5" />
          <rect x="62" y="12.5" width="10" height="2.5" rx="1" />
        </svg>
      </div>
    </div>
  );
}
