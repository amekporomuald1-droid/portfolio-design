import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CustomCursor from "@/components/cursor/CustomCursor";

const Home = lazy(() => import("@/pages/Home"));

export default function App() {
  return (
    <>
      <CustomCursor />
      <Suspense fallback={<div className="min-h-screen bg-[var(--bg,#f6f4f0)]" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}
