import { useCallback, useState } from "react";
import Header from "@/components/layout/Header";
import Loader from "@/components/loader/Loader";
import Hero from "@/components/sections/Hero";

export default function Home() {
  const [ready, setReady] = useState(false);
  const handleLoaded = useCallback(() => setReady(true), []);

  return (
    <>
      <Loader onComplete={handleLoaded} />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-aura-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Aller au contenu
      </a>
      <Header ready={ready} />
      <main id="contenu">
        <Hero ready={ready} />
      </main>
    </>
  );
}
