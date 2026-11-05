import { motion } from "framer-motion";
import Label from "@/components/ui/Label";
import { SITE, WORKS } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function IntroSlide() {
  const reduced = useReducedMotion();
  const scrollToFirst = () => {
    const el = document.querySelector('[data-slide-index="1"]');
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex h-[100svh] flex-col justify-between px-6 py-32 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.08 }}
      >
        <Label>
          Portfolio {SITE.year} · {SITE.city}, {SITE.country}
        </Label>
      </motion.div>

      <div className="mt-8">
        <h1 className="font-display text-[clamp(2.75rem,8vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.04em] max-w-[100%] overflow-wrap-anywhere">
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.08 }}
            >
              {SITE.headline.a}
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.16 }}
            >
              {SITE.headline.b} <em className="font-serif font-normal italic text-aura-red">{SITE.headline.accent}</em>
            </motion.span>
          </div>
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.72 }}
        className="flex items-end justify-between"
      >
        <Label>
          {SITE.name} · {SITE.discipline}
        </Label>
        <button
          type="button"
          onClick={scrollToFirst}
          className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
        >
          {WORKS.length} travaux
          <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
        </button>
      </motion.div>
    </section>
  );
}
