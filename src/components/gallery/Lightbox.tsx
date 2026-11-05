import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { WORKS } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";

interface LightboxProps {
  open: boolean;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ open, index, onClose, onNext, onPrev }: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const work = WORKS[index];

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusables = () =>
      Array.from(containerRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        onNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        onPrev();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
  }, [open, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {open && work && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Aperçu de ${work.title}`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0d1117]/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_EXPO }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 border border-white/20 bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/20 md:right-16 md:top-16"
          >
            Fermer
          </button>

          <button
            ref={prevRef}
            type="button"
            onClick={onPrev}
            disabled={index === 0}
            className="absolute left-6 top-1/2 -translate-y-1/2 border border-white/20 bg-white/10 p-4 text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 md:left-16"
            aria-label="Image précédente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            ref={nextRef}
            type="button"
            onClick={onNext}
            disabled={index === WORKS.length - 1}
            className="absolute right-6 top-1/2 -translate-y-1/2 border border-white/20 bg-white/10 p-4 text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 md:right-16"
            aria-label="Image suivante"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="max-h-[90vh] max-w-[90vw]">
            <img src={work.image} alt={work.alt} className="max-h-[90vh] max-w-[90vw] object-contain" />
          </div>

          <div className="absolute bottom-6 left-6 text-white/60 md:bottom-16 md:left-16">
            <p className="text-sm font-semibold">{work.title}</p>
            <p className="text-xs">{work.client}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
