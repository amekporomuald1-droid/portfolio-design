import { SITE } from "@/data/portfolio";

interface DockProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const TABS = [
  { id: "home", label: "Accueil" },
  { id: "works", label: "Réalisations" },
  { id: "videos", label: "Vidéos" },
  { id: "services", label: "Services" },
  { id: "about", label: "À propos" },
  { id: "contact", label: "Contact" },
] as const;

export default function Dock({ activeTab, onNavigate }: DockProps) {
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % TABS.length;
      onNavigate(TABS[nextIndex].id);
      (e.currentTarget.parentElement?.children[nextIndex] as HTMLElement)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      onNavigate(TABS[prevIndex].id);
      (e.currentTarget.parentElement?.children[prevIndex] as HTMLElement)?.focus();
    }
  };

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-brand-dock/92 px-2 py-2 backdrop-blur-md"
      role="tablist"
      aria-label="Navigation principale"
      data-no-cursor
    >
      <div className="flex items-center gap-2">
        {/* Logo */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111]">
          <img
            src="/brand/logo-icone-blanc.png"
            alt=""
            className="h-6 w-6 object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto px-2 md:overflow-visible">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onNavigate(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white text-brand-ink"
                  : "bg-[#333] text-white hover:bg-[#444]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
