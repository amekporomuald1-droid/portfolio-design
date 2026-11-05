import { useState } from "react";
import { ABOUT, WORKS } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

export default function SectionServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Get a work image for each service based on category mapping
  const getServiceImage = (index: number) => {
    // Simple mapping: use different works for visual variety
    const imageWorks = WORKS.filter((w) => w.image);
    if (imageWorks.length === 0) return null;
    return imageWorks[index % imageWorks.length].image;
  };

  return (
    <section
      id="services"
      className="min-h-screen px-6 py-24 md:px-16 md:py-32 pb-32"
      role="tabpanel"
      aria-labelledby="tab-services"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="tab-services" className="mb-12 text-3xl md:text-5xl">
          Services
        </h2>

        {/* Desktop version with hover effects */}
        <div className="hidden md:block">
          <div className="space-y-0">
            {ABOUT.services.map((service, index) => (
              <div
                key={service}
                className="group relative border-t border-gray-300 py-8"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={handleMouseMove}
                data-cursor="service"
                data-cursor-label={service}
              >
                <div className="flex items-center gap-8">
                  <span className="text-sm font-semibold text-gray-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`flex-1 text-4xl font-bold uppercase tracking-tighter transition-opacity duration-300 ${
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "opacity-30"
                        : "opacity-100"
                    }`}
                  >
                    {service}
                  </h3>
                </div>

                {/* Floating image */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                      }}
                    >
                      <div className="h-48 w-48 overflow-hidden rounded-2xl bg-gray-200 shadow-2xl">
                        <img
                          src={getServiceImage(index) || ""}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile accordion version */}
        <div className="md:hidden space-y-4">
          {ABOUT.services.map((service, index) => (
            <div
              key={service}
              className="rounded-xl border border-gray-300 bg-white overflow-hidden"
            >
              <button
                type="button"
                className="flex w-full items-center gap-4 p-4 text-left"
                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                data-cursor="service"
                data-cursor-label={service}
              >
                <span className="text-sm font-semibold text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 text-xl font-bold uppercase tracking-tight">
                  {service}
                </h3>
                <span className="text-2xl font-light text-gray-400">
                  {hoveredIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <div className="mt-4 h-32 w-full overflow-hidden rounded-xl bg-gray-200">
                        <img
                          src={getServiceImage(index) || ""}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
