import { motion } from "framer-motion";
import HeroTitle from "@/components/hero/HeroTitle";
import StickerField from "@/components/hero/StickerField";
import Label from "@/components/ui/Label";
import TwoBlockButton from "@/components/ui/TwoBlockButton";
import { SITE } from "@/data/portfolio";
import { fadeUpAt } from "@/lib/motion";

export default function Hero({ ready }: { ready: boolean }) {
  const state = ready ? "show" : "hidden";

  return (
    <section
      data-cursor="native"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-10 pt-32 md:px-16 md:pt-36"
    >
      <div>
        <motion.div variants={fadeUpAt(0.2)} initial="hidden" animate={state}>
          <Label>
            {SITE.baseline} · {SITE.city}, {SITE.country}
          </Label>
        </motion.div>
        <HeroTitle ready={ready} className="mt-8" />
      </div>

      <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <motion.div
          variants={fadeUpAt(1.4)}
          initial="hidden"
          animate={state}
          aria-hidden="true"
          className="hidden items-center gap-4 md:flex"
        >
          <div className="relative h-14 w-px overflow-hidden bg-aura-ink/15">
            <span className="scroll-cue absolute inset-0 bg-aura-ink" />
          </div>
          <Label>Scroll</Label>
        </motion.div>

        <motion.div variants={fadeUpAt(1.1)} initial="hidden" animate={state} className="md:mr-[4vw] md:max-w-md">
          <p className="text-base leading-relaxed md:text-lg">{SITE.heroIntro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <TwoBlockButton href={SITE.whatsappPartnerHref} external>
              Devenir partenaire
            </TwoBlockButton>
            <TwoBlockButton variant="light" href="#realisations">
              Voir nos réalisations
            </TwoBlockButton>
          </div>
        </motion.div>
      </div>

      <StickerField />
    </section>
  );
}
