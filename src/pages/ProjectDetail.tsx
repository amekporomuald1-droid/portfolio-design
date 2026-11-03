import { Link, useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <main className="min-h-screen px-6 py-24 md:px-16">
      <Link to="/" className="text-xs uppercase tracking-[0.25em]">← Retour</Link>
      <h1 className="mt-8 text-5xl md:text-7xl">{slug}</h1>
    </main>
  );
}
