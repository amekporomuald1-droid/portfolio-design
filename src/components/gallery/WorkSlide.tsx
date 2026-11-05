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
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  const isFirst = index < 2;
  const isVideo = !!work.video;

  return (
    <section
      ref={targetRef}
      id={`slide-${work.slug}`}
      className="relative flex h-[100dvh] items-center px-6 py-24 md:px-16 scroll-snap-align-start"
    >
      <div className={`flex w-full flex-col gap-8 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Visuel */}
        <div className="relative flex aspect-[4/3] items-center justify-center max-h-[46dvh] md:w-[58.33%] md:aspect-auto md:max-h-[76dvh]">
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
              data-cursor={isVideo ? "play" : "view"}
              className="block w-full bg-neutral-100 shadow-2xl relative"
              aria-label={isVideo ? `Lire la vidéo ${work.title}` : `Agrandir ${work.title}`}
            >
              <img
                src={work.image}
                alt={work.alt ?? `${work.title}, ${work.category}`}
                loading={isFirst ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-contain"
              />
              {isVideo && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-transform hover:scale-110">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 border border-current px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                    Vidéo
                  </span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Texte */}
        <div className="flex flex-col justify-center md:w-[41.67%]">
          <Label className="mb-6 font-semibold">
            {String(index + 1).padStart(2, "0")} — {work.category}
            {work.year && ` · ${work.year}`}
          </Label>
          <h2 className="font-display text-[clamp(2rem,4.6vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em] line-clamp-3" style={{ textWrap: "balance" }}>
            {work.title}
          </h2>
          {work.role && (
            <Label className="mt-4 font-semibold">Client : {work.client}</Label>
          )}
          {work.description && (
            <p className="mt-6 text-base leading-relaxed max-w-[38ch] line-clamp-3 md:line-clamp-none" style={{ textWrap: "pretty" }}>
              {work.description}
            </p>
          )}
          {work.links && work.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {work.links.slice(0, 3).map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  {link.label}
                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Annonce du slide actif pour accessibilité */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Travail {index + 1} sur {total} : {work.title}
      </div>
    </section>
  );
}
