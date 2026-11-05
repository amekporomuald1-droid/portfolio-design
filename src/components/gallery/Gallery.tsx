import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import IntroSlide from "./IntroSlide";
import WorkSlide from "./WorkSlide";
import Lightbox from "./Lightbox";
import IndexOverlay from "./IndexOverlay";
import Label from "@/components/ui/Label";
import { WORKS } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GalleryProps {
  indexOpen: boolean;
  setIndexOpen: (open: boolean) => void;
  scrollToIndex: (index: number) => void;
}

export default function Gallery({ indexOpen, setIndexOpen, scrollToIndex: scrollToIndexProp }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const reduced = useReducedMotion();
  const slidesRef = useRef<(HTMLElement | null)[]>([]);

  // IntersectionObserver pour détecter le slide actif
  useEffect(() => {
    const root = document.documentElement;
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const threshold = reducedQuery.matches ? 0.3 : 0.55;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slidesRef.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              setActiveIndex(idx);
              const work = WORKS[idx];
              // Définir les variables CSS pour le fond et le texte
              if (idx === 0) {
                // Intro
                root.style.setProperty("--bg", "#f6f4f0");
                root.style.setProperty("--fg", "#0d1117");
              } else {
                root.style.setProperty("--bg", work.bg);
                root.style.setProperty("--fg", work.tone === "dark" ? "#ffffff" : "#0d1117");
              }
            }
          }
        });
      },
      { threshold }
    );

    slidesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [reduced]);

  const scrollToSlide = useCallback((index: number) => {
    const el = slidesRef.current[index];
    if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  }, [reduced]);

  const scrollToPrev = useCallback(() => {
    const prev = Math.max(0, activeIndex - 1);
    scrollToSlide(prev);
  }, [activeIndex, scrollToSlide]);

  const scrollToNext = useCallback(() => {
    const next = Math.min(WORKS.length, activeIndex + 1);
    scrollToSlide(next);
  }, [activeIndex, scrollToSlide]);

  const handleOpenLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxNext = useCallback(() => {
    setLightboxIndex((prev) => Math.min(prev + 1, WORKS.length - 1));
  }, []);

  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, document.body.scrollHeight - window.innerHeight], [0, 1]);

  return (
    <>
      <div className={`fixed bottom-6 left-6 z-40 transition-opacity duration-400 md:bottom-16 md:left-16 ${activeIndex === 0 ? "opacity-0" : "opacity-100"}`}>
        <Label>
          {String(activeIndex).padStart(2, "0")} / {String(WORKS.length).padStart(2, "0")}
        </Label>
      </div>

      <div className={`fixed bottom-6 right-6 z-40 flex gap-2 transition-opacity duration-400 md:bottom-16 md:right-16 ${activeIndex === 0 ? "opacity-0" : "opacity-100"}`}>
        <button
          type="button"
          onClick={scrollToPrev}
          disabled={activeIndex === 0}
          className="border border-current px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] disabled:opacity-30"
          aria-label="Travail précédent"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={scrollToNext}
          disabled={activeIndex === WORKS.length}
          className="border border-current px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] disabled:opacity-30"
          aria-label="Travail suivant"
        >
          ↓
        </button>
      </div>

      <div className={`fixed bottom-6 right-32 z-40 hidden transition-opacity duration-400 md:bottom-16 md:right-32 md:block ${activeIndex === 0 ? "opacity-0" : "opacity-100"}`}>
        <div className="h-px w-20 bg-current opacity-15">
          <div className="h-full bg-current" style={{ width: `${(scrollProgress.get() * 100).toFixed(0)}%` }} />
        </div>
      </div>

      <section ref={(el) => (slidesRef.current[0] = el)} className="scroll-snap-start" data-slide-index="0">
        <IntroSlide />
      </section>

      {WORKS.map((work, i) => (
        <section
          key={work.slug}
          ref={(el) => (slidesRef.current[i + 1] = el)}
          className="scroll-snap-start"
          data-slide-index={i + 1}
        >
          <WorkSlide work={work} index={i} total={WORKS.length} onOpen={handleOpenLightbox} />
        </section>
      ))}

      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
      />

      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} onSelect={scrollToIndexProp} />
    </>
  );
}
