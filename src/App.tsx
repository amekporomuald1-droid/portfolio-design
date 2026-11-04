import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CustomCursor from "@/components/cursor/CustomCursor";

const Home = lazy(() => import("@/pages/Home"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));

// Pages de test : disponibles uniquement avec `npm run dev`, absentes du build de production.
const DesignSystem = import.meta.env.DEV ? lazy(() => import("@/pages/DesignSystem")) : null;
const StickerTest = import.meta.env.DEV ? lazy(() => import("@/pages/StickerTest")) : null;
const CursorTest = import.meta.env.DEV ? lazy(() => import("@/pages/CursorTest")) : null;

export default function App() {
  return (
    <>
      <CustomCursor />
      <Suspense fallback={<div className="min-h-screen bg-aura-bg" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets/:slug" element={<ProjectDetail />} />
          {DesignSystem && <Route path="/design" element={<DesignSystem />} />}
          {StickerTest && <Route path="/sticker-test" element={<StickerTest />} />}
          {CursorTest && <Route path="/cursor-test" element={<CursorTest />} />}
        </Routes>
      </Suspense>
    </>
  );
}
