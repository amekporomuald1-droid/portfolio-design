import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const DesignSystem = lazy(() => import("@/pages/DesignSystem"));
const StickerTest = lazy(() => import("@/pages/StickerTest"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aura-bg" aria-busy="true" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets/:slug" element={<ProjectDetail />} />
        <Route path="/design" element={<DesignSystem />} />
        <Route path="/sticker-test" element={<StickerTest />} />
      </Routes>
    </Suspense>
  );
}
