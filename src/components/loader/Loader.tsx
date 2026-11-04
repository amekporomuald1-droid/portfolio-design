import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_EXPO } from "@/lib/motion";

const KEY = "aura:loader-seen";
const DURATION = 2000;

/** En production, le loader n'est montré qu'une fois par session. En développement, toujours. */
function alreadySeen(): boolean {
  if (import.meta.env.DEV) return false;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface LoaderProps {
  /** Appelé quand le rideau commence à se lever (doit être stable : useCallback). */
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const reduced = useReducedMotion();
  const [skip] = useState(alreadySeen);
  const [open, setOpen] = useState(!skip);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skip) {
      onComplete();
      return;
    }
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const duration = reduced ? 400 : DURATION;
    const start = performance.now();
    let raf = 0;
    let cancelled = false;

    const finish = async () => {
      await Promise.race([document.fonts.ready, new Promise<void>((resolve) => setTimeout(resolve, 1200))]);
      if (cancelled) return;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* stockage indisponible : on ignore */
      }
      root.style.overflow = prevOverflow;
      setOpen(false);
      onComplete();
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const p = easeInOutCubic(t) * 100;
      if (numRef.current) numRef.current.textContent = String(Math.round(p));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p / 100})`;
      if (t < 1) raf = requestAnimationFrame(tick);
      else void finish();
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      root.style.overflow = prevOverflow;
    };
  }, [skip, reduced, onComplete]);

  const exit = reduced ? { opacity: 0 } : { y: "-100%" };

  return (
    <AnimatePresence>
      {open && !reduced && (
        <motion.div
          key="curtain-red"
          aria-hidden="true"
          className="fixed inset-0 z-[99] bg-aura-red"
          exit={exit}
          transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.15 }}
        />
      )}
      {open && (
        <motion.div
          key="curtain-ink"
          role="status"
          aria-label="Chargement du site"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-aura-ink px-6 py-8 text-white md:px-16"
          exit={exit}
          transition={{ duration: reduced ? 0.2 : 1.1, ease: EASE_EXPO }}
        >
          <Logo tone="white" />
          <div className="flex items-end leading-none">
            <span
              ref={numRef}
              className="font-display text-[clamp(7rem,28vw,22rem)] font-extrabold tracking-[-0.06em] tabular-nums"
            >
              0
            </span>
            <span className="mb-[0.1em] ml-2 font-serif text-[clamp(3rem,12vw,9rem)] italic text-aura-red">%</span>
          </div>
          <div>
            <div className="mb-4 flex justify-between text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
              <span>Lomé, Togo</span>
              <span>2026</span>
            </div>
            <div className="h-px w-full bg-white/15">
              <div ref={barRef} className="h-full origin-left scale-x-0 bg-aura-red" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
