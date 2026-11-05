import { useState, useEffect } from "react";
import CustomCursor from "@/components/cursor/CustomCursor";
import TopBar from "@/components/layout/TopBar";
import Dock from "@/components/layout/Dock";
import SectionHome from "@/components/sections/SectionHome";
import SectionWorks from "@/components/sections/SectionWorks";
import SectionVideos from "@/components/sections/SectionVideos";
import SectionServices from "@/components/sections/SectionServices";
import SectionAbout from "@/components/sections/SectionAbout";
import SectionContact from "@/components/sections/SectionContact";
import Lightbox from "@/components/gallery/Lightbox";

type Tab = "home" | "works" | "videos" | "services" | "about" | "contact";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Tab;
      if (["home", "works", "videos", "services", "about", "contact"].includes(hash)) {
        setActiveTab(hash);
      }
    };

    // Initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update URL hash when tab changes
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  const handleNavigate = (tab: Tab) => {
    setActiveTab(tab);
    // Scroll to top of section
    const section = document.getElementById(tab);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % 15); // WORKS.length
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + 15) % 15); // WORKS.length
  };

  return (
    <>
      <CustomCursor />
      <TopBar activeTab={activeTab} onNavigate={handleNavigate} />

      <main className="min-h-screen bg-brand-bg pb-32">
        <SectionHome
          onOpenLightbox={handleOpenLightbox}
          onNavigate={handleNavigate}
        />
        <SectionWorks onOpenLightbox={handleOpenLightbox} />
        <SectionVideos />
        <SectionServices />
        <SectionAbout />
        <SectionContact />
      </main>

      <Dock activeTab={activeTab} onNavigate={handleNavigate} />

      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
      />
    </>
  );
}
