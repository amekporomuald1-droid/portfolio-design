import { useState, useEffect, useRef } from "react";
import { SITE, WORKS } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface TopBarProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
}

export default function TopBar({ onNavigate, activeTab }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof WORKS>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = WORKS.filter(
      (work) =>
        work.title.toLowerCase().includes(query) ||
        work.client.toLowerCase().includes(query) ||
        work.category.toLowerCase().includes(query)
    ).slice(0, 6);

    setSearchResults(results);
    setShowResults(results.length > 0);
    setSelectedIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const work = searchResults[selectedIndex];
      onNavigate("works");
      setSearchQuery("");
      setShowResults(false);
    } else if (e.key === "Escape") {
      setShowResults(false);
      setSelectedIndex(-1);
    }
  };

  const handleResultClick = (work: typeof WORKS[0]) => {
    onNavigate("works");
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-brand-bg/95 px-6 backdrop-blur-sm md:px-16"
      data-no-cursor
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("home");
        }}
        className="flex items-center"
        aria-label={`${SITE.name}, retour à l'accueil`}
      >
        <img
          src="/brand/logo-icone-bordeaux.png"
          alt=""
          className="h-10 w-10 object-contain"
          aria-hidden="true"
        />
        <span className="sr-only">{SITE.name}</span>
      </a>

      {/* Navigation links - desktop */}
      <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
        {["Réalisations", "Vidéos", "Services", "À propos"].map((item) => {
          const tab = item.toLowerCase().replace("à propos", "about");
          return (
            <button
              key={item}
              type="button"
              onClick={() => onNavigate(tab)}
              className={`relative py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === tab ? "text-brand-ink" : "text-gray-600 hover:text-brand-ink"
              }`}
            >
              {item}
              <span
                className={`absolute bottom-0 left-0 h-px bg-brand-ink transition-all duration-300 ${
                  activeTab === tab ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Search */}
      <div ref={searchRef} className="relative z-50">
        <div className="relative flex items-center rounded-xl bg-brand-field px-4 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Rechercher une réalisation"
            className="ml-3 w-32 bg-transparent text-sm outline-none placeholder:text-gray-400 md:w-48"
            data-cursor="native"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setShowResults(false);
              }}
              className="ml-2 text-gray-400 hover:text-gray-600"
              aria-label="Effacer la recherche"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {showResults && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-white p-2 shadow-lg"
            >
              {searchResults.map((work, index) => (
                <button
                  key={work.slug}
                  type="button"
                  onClick={() => handleResultClick(work)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    index === selectedIndex ? "bg-brand-field" : "hover:bg-brand-field"
                  }`}
                  data-cursor="native"
                >
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={work.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{work.title}</p>
                    <p className="truncate text-xs text-gray-500">
                      {work.client} · {work.category}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="hidden rounded-xl bg-brand-ink px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800 md:block"
          data-cursor="link"
        >
          Contact
        </button>
        <a
          href={SITE.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-xl border border-brand-ink px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-brand-field md:block"
          data-cursor="link"
        >
          WhatsApp
        </a>
        {/* Mobile contact button */}
        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="rounded-xl bg-brand-ink px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800 md:hidden"
          data-cursor="link"
        >
          Contact
        </button>
      </div>
    </header>
  );
}
