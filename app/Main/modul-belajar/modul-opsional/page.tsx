"use client";

import { Inter } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";

const inter = Inter({ subsets: ["latin"] });

// ─── Video Data ───────────────────────────────────────────────────────────────
const videos = [
  {
    id: 1,
    title: "Tutorial Invest untuk Pemula",
    youtubeId: "T_dOr3kWbUM",
    thumbnail: `https://img.youtube.com/vi/T_dOr3kWbUM/maxresdefault.jpg`,
    level: "Beginner",
    levelColor: "#26AA52",
  },
  {
    id: 2,
    title: "Investasi Reksadana untuk Pemula",
    youtubeId: "U53xSitih20",
    thumbnail: `https://img.youtube.com/vi/U53xSitih20/maxresdefault.jpg`,
    level: "Beginner",
    levelColor: "#26AA52",
  },
  {
    id: 3,
    title: "Belajar Analisis Fundamental",
    youtubeId: "tzbTQcJ2EHM",
    thumbnail: `https://img.youtube.com/vi/tzbTQcJ2EHM/maxresdefault.jpg`,
    level: "Intermediate",
    levelColor: "#5AA4F0",
  },
  {
    id: 4,
    title: "Cara Baca Laporan Keuangan Perusahaan",
    youtubeId: "d0Tyfk3B2BA",
    thumbnail: `https://img.youtube.com/vi/d0Tyfk3B2BA/maxresdefault.jpg`,
    level: "Intermediate",
    levelColor: "#5AA4F0",
  },
  {
    id: 5,
    title: "International Diversification",
    youtubeId: "1FXuMs6YRCY",
    thumbnail: `https://img.youtube.com/vi/1FXuMs6YRCY/maxresdefault.jpg`,
    level: "Expert",
    levelColor: "#E07B39",
  },
  {
    id: 6,
    title: "Hedging Strategy and Mathematics Behind It",
    youtubeId: "NGBPq_CSha8",
    thumbnail: `https://img.youtube.com/vi/NGBPq_CSha8/maxresdefault.jpg`,
    level: "Expert",
    levelColor: "#E07B39",
  },
];

type Video = (typeof videos)[0];

// ─── Video Player Page ────────────────────────────────────────────────────────
function VideoPlayerPage({
  video,
  progress,
  onBack,
  onProgressUpdate,
}: {
  video: Video;
  progress: number;
  onBack: () => void;
  onProgressUpdate: (id: number, pct: number) => void;
}) {
  const [watched, setWatched] = useState(progress);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Increment watched progress
  useEffect(() => {
    if (watched >= 100) return;

    intervalRef.current = setInterval(() => {
      setWatched((prev) => Math.min(prev + 1, 100));
    }, 600);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Sync progress ke parent setelah render selesai
  useEffect(() => {
    onProgressUpdate(video.id, watched);
  }, [watched]);

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
        <button onClick={onBack} className="hover:text-gray-700 transition-colors">
          Modul Belajar
        </button>
        <span>›</span>
        <span className="text-gray-500">Opsional</span>
        <span>›</span>
        <span className="text-gray-800 font-medium">{video.title}</span>
      </div>

      <div className="max-w-4xl w-full">
        {/* Video Embed */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Title + Progress */}
        <div className="mt-5 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0"
                style={{ background: video.levelColor, color: "white" }}
              >
                {video.level}
              </span>
              <h2 className="text-lg font-bold text-gray-900">{video.title}</h2>
            </div>
            <span
              className="text-sm font-semibold shrink-0"
              style={{ color: video.levelColor }}
            >
              {watched}% Selesai
            </span>
          </div>

          <div className="mt-4 w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${watched}%`,
                background: `linear-gradient(90deg, ${video.levelColor}, ${video.levelColor}bb)`,
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Progress otomatis tercatat saat kamu menonton video ini.
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Kembali ke Daftar Modul
        </button>
      </div>
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({
  video,
  progress,
  onClick,
}: {
  video: Video;
  progress: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-200">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
        {/* Level badge */}
        <span
          className="absolute top-2 left-2 text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{ background: video.levelColor, color: "white" }}
        >
          {video.level}
        </span>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        {/* Progress badge */}
        {progress > 0 && (
          <div
            className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: video.levelColor }}
          >
            {progress}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-800 leading-snug mb-3 line-clamp-2">
          {video.title}
        </p>
        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: progress > 0 ? video.levelColor : "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ModulOpsionalPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});

  const handleProgressUpdate = (id: number, pct: number) => {
    setProgressMap((prev) => ({ ...prev, [id]: pct }));
  };

  const overallProgress =
    videos.length > 0
      ? Math.round(
          Object.values(progressMap).reduce((a, b) => a + b, 0) / videos.length
        )
      : 0;

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {!selectedVideo ? (
          <>
            {/* Header */}
            <div className="mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <span>Modul Belajar</span>
                <span>›</span>
                <span className="text-gray-700 font-medium">Opsional</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Strategi Lanjutan</h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Tingkatkan kemampuan investasimu ke level berikutnya
              </p>
            </div>

            {/* Overall Progress */}
            <div className="max-w-4xl mb-5 mt-4">
              <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-600 font-medium">Progress Keseluruhan</span>
                    <span className="font-bold" style={{ color: "#1765C4" }}>
                      {overallProgress}% Selesai
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${overallProgress}%`,
                        background: "linear-gradient(90deg, #5AA4F0, #1765C4)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="text-2xl font-bold min-w-[48px] text-right"
                  style={{ color: "#1765C4" }}
                >
                  {overallProgress}%
                </div>
              </div>
            </div>

            {/* Level Legend */}
            <div className="flex items-center gap-5 mb-5 max-w-4xl">
              {[
                { label: "Beginner", color: "#26AA52" },
                { label: "Intermediate", color: "#5AA4F0" },
                { label: "Expert", color: "#E07B39" },
              ].map((lvl) => (
                <div key={lvl.label} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ background: lvl.color }}
                  />
                  <span className="text-xs text-gray-500 font-medium">{lvl.label}</span>
                </div>
              ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  progress={progressMap[video.id] ?? 0}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </>
        ) : (
          <VideoPlayerPage
            video={selectedVideo}
            progress={progressMap[selectedVideo.id] ?? 0}
            onBack={() => setSelectedVideo(null)}
            onProgressUpdate={handleProgressUpdate}
          />
        )}
      </div>
    </div>
  );
}