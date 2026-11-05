import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Label from "@/components/ui/Label";
import { SITE, WORKS } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";

interface IndexOverlayProps {
  open: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export default function IndexOverlay({ open, onClose, onSelect }: IndexOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Index des travaux"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-aura-ink text-white"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE_EXPO }}
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-16">
            <span className="font-display text-2xl font-extrabold tracking-[-0.06em]">{SITE.name}</span>
            <button
              type="button"
              onClick={onClose}
              className="border border-aura-red px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
            >
              Fermer
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8 md:px-16">
            <ul className="m-0 list-none space-y-6 p-0">
              {WORKS.map((work, i) => (
                <li key={work.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(i);
                      onClose();
                    }}
                    className="flex w-full items-baseline gap-4 text-left transition-colors hover:text-aura-red"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.25em] text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">
                      {work.title}
                    </span>
                    <Label className="ml-auto">{work.client}</Label>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pb-8 md:px-16">
            <Label className="text-white/60">
              {SITE.city}, {SITE.country} · {SITE.year}
            </Label>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
