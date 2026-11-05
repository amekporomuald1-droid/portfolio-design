import { useState } from "react";
import { WORKS } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { parseYouTubeId, youtubeEmbedUrl, youtubeThumb, isPortraitVideo } from "@/lib/media";

interface VideoFrameProps {
  work: typeof WORKS[0];
  onPlay?: () => void;
}

function VideoFrame({ work, onPlay }: VideoFrameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeId = work.video ? parseYouTubeId(work.video.url) : null;
  const isPortrait = work.video ? isPortraitVideo(work.video.url, work.video.orientation) : false;

  if (!youtubeId) return null;

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-300 bg-gray-100 ${
        isPortrait ? "aspect-[9/16] max-w-[320px]" : "aspect-video"
      }`}
      data-cursor="play"
    >
      {!isPlaying ? (
        <>
          <img
            src={youtubeThumb(youtubeId)}
            alt={work.alt || work.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button
              type="button"
              onClick={handlePlay}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-ink transition-transform hover:scale-110"
              aria-label={`Lire ${work.title}`}
            >
              <Play className="h-6 w-6 fill-current" />
            </button>
          </div>
          <span className="absolute right-3 top-3 rounded-full bg-brand-ink px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Vidéo
          </span>
        </>
      ) : (
        <iframe
          src={youtubeEmbedUrl(youtubeId, { autoplay: true, start: work.video?.start })}
          title={work.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default function SectionVideos() {
  const videoWorks = WORKS.filter((work) => work.video);

  return (
    <section
      id="videos"
      className="min-h-screen px-6 py-24 md:px-16 md:py-32 pb-32"
      role="tabpanel"
      aria-labelledby="tab-videos"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="tab-videos" className="mb-12 text-3xl md:text-5xl">
          Vidéos
        </h2>

        {videoWorks.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Vidéo à venir
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Main videos grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {videoWorks
                .filter((work) => !work.video?.orientation || work.video.orientation === "landscape")
                .map((work) => (
                  <motion.div
                    key={work.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <VideoFrame work={work} />
                    <div className="mt-4">
                      <h3 className="text-lg font-bold uppercase tracking-tight">{work.title}</h3>
                      <p className="text-sm text-gray-600">
                        {work.client}
                        {work.year && ` · ${work.year}`}
                      </p>
                      {work.links && work.links.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {work.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy hover:underline"
                              data-cursor="link"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Short videos row */}
            {videoWorks.some((work) => work.video?.orientation === "portrait") && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-bold uppercase tracking-tight">Formats courts</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {videoWorks
                    .filter((work) => work.video?.orientation === "portrait")
                    .map((work) => (
                      <motion.div
                        key={work.slug}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <VideoFrame work={work} />
                        <div className="mt-3">
                          <h3 className="text-sm font-bold uppercase tracking-tight line-clamp-2">
                            {work.title}
                          </h3>
                          <p className="text-xs text-gray-600">{work.client}</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
