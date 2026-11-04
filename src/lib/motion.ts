import type { Variants } from "framer-motion";

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Apparition vers le haut avec délai (s). À utiliser avec initial="hidden" animate="show". */
export const fadeUpAt = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EXPO, delay } },
});
