import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CustomCursor from "@/components/cursor/CustomCursor";

const Home = lazy(() => import("@/pages/Home"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const DesignSystem = lazy(() => import("@/pages/DesignSystem"));
const StickerTest = lazy(() => import("@/pages/StickerTest"));
const CursorTest = lazy(() => import("@/pages/CursorTest"));

export default function App() {
  return (
    <>
      <CustomCursor />
      <Suspense fallback={<div className="min-h-screen bg-aura-bg" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets/:slug" element={<ProjectDetail />} />
          <Route path="/design" element={<DesignSystem />} />
          <Route path="/sticker-test" element={<StickerTest />} />
          <Route path="/cursor-test" element={<CursorTest />} />
        </Routes>
      </Suspense>
    </>
  );
}
