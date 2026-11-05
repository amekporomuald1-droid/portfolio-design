import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE, WORKS } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";

export default function Header({ onOpenIndex }: { onOpenIndex: () => void }) {
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.08 }}
        className="fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-6 md:h-[80px] md:px-16"
        style={{ color: "var(--fg)", transition: "color 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <a
          href="#"
          className="group relative inline-flex items-baseline gap-1 font-display text-[22px] font-extrabold tracking-[-0.04em]"
          aria-label={`${SITE.name}, retour au début`}
        >
          AURA
          <span
            className="h-[6px] w-[6px] bg-aura-red"
            aria-hidden="true"
          />
          {/* Remplacer par le logo SVG officiel quand disponible */}
        </a>

        <div className="flex items-center gap-7 md:gap-7">
          <button
            type="button"
            onClick={onOpenIndex}
            className="group relative inline-flex items-center gap-1.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100 focus-visible:after:scale-x-100"
          >
            Index
            <sup className="text-[9px] opacity-60">{WORKS.length}</sup>
          </button>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100 focus-visible:after:scale-x-100"
          >
            Contact
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </a>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.08 }}
        className="fixed inset-x-0 top-[72px] z-40 h-px bg-current opacity-15 md:top-[80px]"
        style={{ margin: "0 1.5rem" }}
      />
    </>
  );
}
