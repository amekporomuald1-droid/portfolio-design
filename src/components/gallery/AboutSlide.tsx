import { motion } from "framer-motion";
import Label from "@/components/ui/Label";
import { SITE, ABOUT } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AboutSlide() {
  const reduced = useReducedMotion();

  return (
    <section className="flex h-[100dvh] flex-col justify-between px-6 py-32 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.08 }}
      >
        <Label>À propos</Label>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 max-w-[1440px] mx-auto w-full">
        <motion.div
          className="md:col-span-7 space-y-12"
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_EXPO }}
        >
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            {ABOUT.title.text}{" "}
            <em className="font-serif font-normal italic" style={{ color: "var(--accent)" }}>
              {ABOUT.title.accent}
            </em>
          </h2>

          <p className="text-lg leading-relaxed max-w-[52ch]">{ABOUT.intro}</p>

          <p className="text-base leading-relaxed max-w-[52ch]">{ABOUT.vision}</p>
        </motion.div>

        <motion.div
          className="md:col-span-5 space-y-12"
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.08 }}
        >
          <div>
            <h3 className="mb-4 font-semibold uppercase tracking-[0.2em] text-[11px]">Services</h3>
            <ul className="list-none space-y-3 p-0">
              {ABOUT.services.map((service, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-px w-8 bg-current opacity-30" />
                  <span className="text-base">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold uppercase tracking-[0.2em] text-[11px]">Valeurs</h3>
            <div className="flex flex-wrap gap-3">
              {ABOUT.values.map((value, i) => (
                <span
                  key={i}
                  className="border border-current px-4 py-2 text-sm font-semibold uppercase tracking-[0.15em]"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.72 }}
      >
        <Label>{SITE.name} · {SITE.discipline}</Label>
      </motion.div>
    </section>
  );
}
