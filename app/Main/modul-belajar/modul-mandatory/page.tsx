"use client";

import { Inter } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";

const inter = Inter({ subsets: ["latin"] });

// ─── Video Data ───────────────────────────────────────────────────────────────
const videos = [
  {
    id: 1,
    title: "Belajar Investasi Pemula",
    youtubeId: "c9PrrJlntos",
    thumbnail: `https://img.youtube.com/vi/c9PrrJlntos/maxresdefault.jpg`,
  },
  {
    id: 2,
    title: "Mengapa Berinvestasi Penting",
    youtubeId: "apTg84k5_J0",
    thumbnail: `https://img.youtube.com/vi/apTg84k5_J0/maxresdefault.jpg`,
  },
  {
    id: 3,
    title: "Memahami Risiko Investasi",
    youtubeId: "UJMWXrKkeFM",
    thumbnail: `https://img.youtube.com/vi/UJMWXrKkeFM/maxresdefault.jpg`,
  },
  {
    id: 4,
    title: "Diversifikasi Portofolio",
    youtubeId: "KDF2SogWuJs",
    thumbnail: `https://img.youtube.com/vi/KDF2SogWuJs/maxresdefault.jpg`,
  },
  {
    id: 5,
    title: "Analisis Laporan Keuangan",
    youtubeId: "kUECuFPTWL4",
    thumbnail: `https://img.youtube.com/vi/kUECuFPTWL4/maxresdefault.jpg`,
  },
  {
    id: 6,
    title: "Strategi Investasi Jangka Panjang",
    youtubeId: "vI5pwqTwxiQ",
    thumbnail: `https://img.youtube.com/vi/vI5pwqTwxiQ/maxresdefault.jpg`,
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
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
  const [playing, setPlaying] = useState(false);

  // Simulate progress increment while "playing"
  useEffect(() => {
    if (playing && watched < 100) {
      intervalRef.current = setInterval(() => {
        setWatched((prev) => {
          const next = Math.min(prev + 1, 100);
          onProgressUpdate(video.id, next);
          return next;
        });
      }, 600);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, watched]);

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
        <button
          onClick={onBack}
          className="hover:text-gray-700 transition-colors"
        >
          Modul Belajar
        </button>
        <span>›</span>
        <span className="text-gray-500">Mandatory</span>
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
            onLoad={() => setPlaying(true)}
          />
        </div>

        {/* Title + Progress */}
        <div className="mt-5 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">{video.title}</h2>
            <span className="text-sm font-semibold text-[#26AA52]">
              {watched}% Selesai
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${watched}%`,
                background: "linear-gradient(90deg, #26AA52, #1adb6a)",
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
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
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
          <div className="absolute top-2 right-2 bg-[#26AA52] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {progress}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-800 leading-snug mb-3">
          {video.title}
        </p>
        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: progress > 0 ? "#26AA52" : "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ModulMandatoryPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});

  const handleProgressUpdate = (id: number, pct: number) => {
    setProgressMap((prev) => ({ ...prev, [id]: pct }));
  };

  const overallProgress =
    videos.length > 0
      ? Math.round(
          Object.values(progressMap).reduce((a, b) => a + b, 0) /
            videos.length
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
                <span className="text-gray-700 font-medium">Mandatory</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Dasar-dasar Investasi
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Selesaikan semua video untuk melanjutkan
              </p>
            </div>

            {/* Overall progress */}
            <div className="max-w-4xl mb-7 mt-4">
              <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-600 font-medium">
                      Progress Keseluruhan
                    </span>
                    <span className="text-[#26AA52] font-bold">
                      {overallProgress}% Selesai
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${overallProgress}%`,
                        background:
                          "linear-gradient(90deg, #26AA52, #1adb6a)",
                      }}
                    />
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#26AA52] min-w-[48px] text-right">
                  {overallProgress}%
                </div>
              </div>
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
          /* Video Player Page */
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