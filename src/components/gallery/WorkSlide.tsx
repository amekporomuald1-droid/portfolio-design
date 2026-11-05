import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Label from "@/components/ui/Label";
import type { Work } from "@/types/portfolio";

interface WorkSlideProps {
  work: Work;
  index: number;
  total: number;
  onOpen: (index: number) => void;
}

export default function WorkSlide({ work, index, total, onOpen }: WorkSlideProps) {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  const isFirst = index < 2;

  return (
    <section
      ref={targetRef}
      id={`slide-${work.slug}`}
      className="relative flex h-[100svh] items-center px-6 py-24 md:px-16 scroll-snap-align-start"
    >
      <div className={`flex w-full flex-col gap-8 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Visuel */}
        <div className="relative flex aspect-[4/3] items-center justify-center md:w-1/2 md:aspect-auto md:h-[78svh]">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <button
              type="button"
              onClick={() => onOpen(index)}
              data-cursor="view"
              className="block w-full bg-neutral-100 shadow-2xl"
              aria-label={`Agrandir ${work.title}`}
            >
              <img
                src={work.image}
                alt={work.alt}
                loading={isFirst ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-contain"
              />
            </button>
          </motion.div>
        </div>

        {/* Texte */}
        <div className="flex flex-col justify-center md:w-1/2">
          <div className="mb-6 flex flex-wrap gap-4">
            <Label>{work.client}</Label>
            <Label>{work.category}</Label>
            {work.year && <Label>{work.year}</Label>}
          </div>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            {work.title}
          </h2>
          <Label className="mt-8">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </Label>
        </div>
      </div>
    </section>
  );
}
