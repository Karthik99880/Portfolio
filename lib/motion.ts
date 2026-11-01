export const ease = [0.22, 1, 0.36, 1] as const;
export const easeCss = `cubic-bezier(${ease.join(", ")})`;
export const duration = { reveal: 0.7, fast: 0.35 } as const;
export const stagger = 0.06;
export const offset = 24;
export const revealTransition = { duration: duration.reveal, ease } as const;
