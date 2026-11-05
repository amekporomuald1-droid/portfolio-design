import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Gallery from "@/components/gallery/Gallery";

export default function Home() {
  const [indexOpen, setIndexOpen] = useState(false);
  const galleryRef = useRef<{ scrollToContact: () => void }>(null);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-aura-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Aller au contenu
      </a>
      <Header
        onOpenIndex={() => setIndexOpen(true)}
        scrollToContact={() => galleryRef.current?.scrollToContact()}
      />
      <main id="contenu">
        <Gallery
          ref={galleryRef}
          indexOpen={indexOpen}
          setIndexOpen={setIndexOpen}
        />
      </main>
    </>
  );
}
