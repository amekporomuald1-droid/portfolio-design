import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import Label from "@/components/ui/Label";
import Sticker from "@/components/ui/Sticker";
import TwoBlockButton from "@/components/ui/TwoBlockButton";
import type { StickerName } from "@/components/ui/stickerArt";
import { NAV_LINKS, SITE } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_EXPO } from "@/lib/motion";

const DECOR: { name: StickerName; size: number; rotate: number; pos: string }[] = [
  { name: "ball", size: 120, rotate: -12, pos: "right-[6%] top-[14%]" },
  { name: "star", size: 70, rotate: 10, pos: "left-[8%] bottom-[26%]" },
  { name: "lba", size: 130, rotate: 8, pos: "right-[10%] bottom-[18%]" },
  { name: "flame", size: 84, rotate: -8, pos: "left-[42%] top-[10%]" },
];

interface FullscreenMenuProps {
  open: boolean;
  /** Doit être stable (useCallback). */
  onClose: () => void;
}

export default function FullscreenMenu({ open, onClose }: FullscreenMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
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
          key="menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-aura-ink text-white"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduced ? 0.01 : 0.9, ease: EASE_EXPO }}
        >
          {DECOR.map((d, i) => (
            <motion.div
              key={d.name}
              aria-hidden="true"
              className={`pointer-events-none absolute z-0 ${d.pos}`}
              animate={reduced ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sticker name={d.name} size={d.size} rotate={d.rotate} />
            </motion.div>
          ))}

          <div className="relative z-10 flex items-center justify-between px-6 py-5">
            <Logo tone="white" />
            <button
              type="button"
              onClick={onClose}
              className="border border-aura-red px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
            >
              Fermer
            </button>
          </div>

          <nav aria-label="Menu mobile" className="relative z-10 flex flex-1 flex-col justify-center px-6">
            <ul className="m-0 list-none p-0">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden py-[0.1em]">
                  <motion.a
                    href={link.href}
                    onClick={onClose}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE_EXPO, delay: reduced ? 0 : 0.3 + i * 0.08 }}
                    className="flex items-baseline gap-4 font-display text-[clamp(2.5rem,13vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em]"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.25em] text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={i === NAV_LINKS.length - 1 ? "font-serif font-normal italic text-aura-red" : ""}>
                      {link.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex flex-col gap-6 px-6 pb-8">
            <TwoBlockButton href={SITE.whatsappPartnerHref} external>
              Devenir partenaire
            </TwoBlockButton>
            <Label className="text-white/60">
              {SITE.city}, {SITE.country} · {SITE.handle} · {SITE.whatsappDisplay}
            </Label>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
