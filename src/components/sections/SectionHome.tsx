import { useState, useEffect, useRef } from "react";
import { WORKS } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { parseYouTubeId, youtubeEmbedUrl } from "@/lib/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionHomeProps {
  onOpenLightbox: (index: number) => void;
  onNavigate: (tab: string) => void;
}

export default function SectionHome({ onOpenLightbox, onNavigate }: SectionHomeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const reduced = useReducedMotion();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation every 8 seconds
  useEffect(() => {
    if (reduced || isPaused || isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WORKS.length);
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reduced, isPaused, isPlaying]);

  const currentWork = WORKS[currentIndex];
  const youtubeId = currentWork.video ? parseYouTubeId(currentWork.video.url) : null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % WORKS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + WORKS.length) % WORKS.length);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Get recent works (first 4, excluding current)
  const recentWorks = WORKS.filter((_, i) => i !== currentIndex).slice(0, 4);

  // Get video works for featured videos section
  const videoWorks = WORKS.filter((w) => w.video).slice(0, 3);

  return (
    <section
      id="home"
      className="min-h-screen px-6 py-24 md:px-16 md:py-32 pb-32"
      role="tabpanel"
      aria-labelledby="tab-home"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="tab-home" className="sr-only">
          Accueil
        </h2>

        {/* Featured Work */}
        <div
          className="mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Info line */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
            <span>Réalisation à la une</span>
            <span className="text-gray-400">·</span>
            {currentWork.year && (
              <span className="rounded-full border border-gray-300 px-3 py-1">
                {currentWork.year}
              </span>
            )}
            <span className="text-gray-400">·</span>
            <span>{currentWork.category}</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-center text-[clamp(2.5rem,9vw,9rem)] font-bold uppercase tracking-tighter leading-[0.92] max-h-[2em] overflow-hidden">
            {currentWork.title}
          </h1>

          {/* Client line */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-ink text-white font-bold">
              {currentWork.client.charAt(0)}
            </div>
            <span className="underline decoration-2 underline-offset-4">
              {currentWork.client}
            </span>
          </div>

          {/* Large frame */}
          <div
            className="relative mx-auto mb-8 min-h-[70dvh] w-full max-w-[calc(100%-1rem)] rounded-3xl p-[5%]"
            style={{
              backgroundColor: currentWork.accent || currentWork.bg || "#6f001a",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full"
              >
                {youtubeId && isPlaying ? (
                  <iframe
                    src={youtubeEmbedUrl(youtubeId, {
                      autoplay: true,
                      start: currentWork.video?.start,
                    })}
                    title={currentWork.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={currentWork.image}
                      alt={currentWork.alt || currentWork.title}
                      className="h-full w-full object-contain"
                    />
                    {youtubeId && !isPlaying && (
                      <button
                        type="button"
                        onClick={handlePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                        aria-label={`Lire ${currentWork.title}`}
                        data-cursor="play"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-brand-ink transition-transform hover:scale-110">
                          <Play className="h-8 w-8 fill-current" />
                        </div>
                      </button>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-ink transition-transform hover:scale-110"
              aria-label="Travail précédent"
              data-cursor="link"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-ink transition-transform hover:scale-110"
              aria-label="Travail suivant"
              data-cursor="link"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {WORKS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === currentIndex ? "w-8 bg-brand-ink" : "bg-gray-300"
                }`}
                aria-label={`Aller au travail ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scrolling ribbon */}
        <div className="mb-16 overflow-hidden py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[
              "Branding",
              "Contenu",
              "Stratégie",
              "Conseil digital",
              "Réalisations",
              "Services",
            ].map((word, i) => (
              <span
                key={i}
                className="mx-8 text-2xl font-bold uppercase tracking-tighter text-gray-400"
              >
                {word}
              </span>
            ))}
            {[
              "Branding",
              "Contenu",
              "Stratégie",
              "Conseil digital",
              "Réalisations",
              "Services",
            ].map((word, i) => (
              <span
                key={`dup-${i}`}
                className="mx-8 text-2xl font-bold uppercase tracking-tighter text-gray-400"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Works */}
        <div className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold uppercase tracking-tight">
              Réalisations récentes
            </h3>
            <button
              type="button"
              onClick={() => onNavigate("works")}
              className="text-sm font-semibold uppercase tracking-wider underline"
              data-cursor="link"
            >
              Voir tout
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentWorks.map((work) => (
              <button
                key={work.slug}
                type="button"
                onClick={() => onOpenLightbox(WORKS.indexOf(work))}
                className="group text-left"
                data-cursor="view"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200 p-3">
                  <img
                    src={work.image}
                    alt={work.alt || work.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-bold uppercase tracking-tight line-clamp-2">
                    {work.title}
                  </p>
                  <p className="text-xs text-gray-600">{work.client}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Videos */}
        {videoWorks.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold uppercase tracking-tight">
                Vidéos à la une
              </h3>
              <button
                type="button"
                onClick={() => onNavigate("videos")}
                className="text-sm font-semibold uppercase tracking-wider underline"
                data-cursor="link"
              >
                Voir tout
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {videoWorks.map((work) => (
                <div
                  key={work.slug}
                  className="aspect-video overflow-hidden rounded-2xl border border-gray-300 bg-gray-100 relative"
                >
                  <img
                    src={work.image}
                    alt={work.alt || work.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-ink">
                      <Play className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  <span className="absolute right-3 top-3 rounded-full bg-brand-ink px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Vidéo
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
