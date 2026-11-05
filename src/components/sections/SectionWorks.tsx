import { useState } from "react";
import { WORKS } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

interface SectionWorksProps {
  onOpenLightbox: (index: number) => void;
}

export default function SectionWorks({ onOpenLightbox }: SectionWorksProps) {
  const [activeFilter, setActiveFilter] = useState("Tout");

  // Get unique categories
  const categories = ["Tout", ...Array.from(new Set(WORKS.map((w) => w.category)))];

  // Filter works based on active filter
  const filteredWorks =
    activeFilter === "Tout"
      ? WORKS
      : WORKS.filter((work) => work.category === activeFilter);

  return (
    <section
      id="works"
      className="min-h-screen px-6 py-24 md:px-16 md:py-32 pb-32"
      role="tabpanel"
      aria-labelledby="tab-works"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="tab-works" className="mb-12 text-3xl md:text-5xl">
          Réalisations
        </h2>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeFilter === category
                  ? "bg-brand-ink text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => onOpenLightbox(WORKS.indexOf(work))}
                  className="group w-full text-left"
                  data-cursor="view"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200 p-4">
                    <img
                      src={work.image}
                      alt={work.alt || `${work.title}, ${work.category}`}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold uppercase tracking-tight line-clamp-2">
                      {work.title}
                    </h3>
                    <p className="text-sm text-gray-600">{work.client}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{work.category}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredWorks.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            Aucune réalisation dans cette catégorie.
          </p>
        )}
      </div>
    </section>
  );
}
