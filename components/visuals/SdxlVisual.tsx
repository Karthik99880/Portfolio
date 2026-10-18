import type { SdxlVisual as SdxlVisualContent } from "@/lib/content";
import styles from "../Projects.module.css";

interface Props {
  visual: SdxlVisualContent;
  active: boolean;
}

export function SdxlVisual({ visual, active }: Props) {
  return (
    <div className={`${styles.frame} ${active ? styles.active : ""}`}>
      <div className={styles.chrome}>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {visual.url}
      </div>
      <div className={`${styles.screen} ${styles.sdxlScreen}`}>
        <div className={styles.sdxlBar}>
          <span className={styles.sdxlPrompt}>{visual.prompt}</span>
          <span className={styles.sdxlCta}>{visual.cta}</span>
        </div>
        <div className={styles.sdxlGrid} aria-hidden="true">
          <div className={styles.sdxlTile} />
          <div className={styles.sdxlTile} />
          <div className={styles.sdxlTile} />
          <div className={styles.sdxlTile} />
        </div>
      </div>
    </div>
  );
}
