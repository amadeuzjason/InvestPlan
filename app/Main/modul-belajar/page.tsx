"use client";

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import SideNavbar from "@/app/components/layout/sideNavbar";

const inter = Inter({ subsets: ["latin"] });

const modules = [
  {
    id: 1,
    title: "Dasar-dasar Investasi",
    badge: "Mandatory",
    badgeBg: "#26AA52",
    badgeText: "white",
    progress: 40,
    progressColor: "#26AA52",
    buttonLabel: "Lanjutkan",
    buttonBg: "#26AA52",
    buttonText: "white",
    bg: "/images/modul/bg-dasarInvest.jpg",
    cardBg: "linear-gradient(135deg, #1A3A6B 0%, #1E4DB7 60%, #1765C4 100%)",
    textColor: "white",
    progressLabel: "40% Selesai",
    link: "/Main/modul-belajar/modul-mandatory",
  },
  {
    id: 2,
    title: "Strategi Lanjutan",
    badge: "Opsional",
    badgeBg: "rgba(90,164,240,0.18)",
    badgeText: "#5AA4F0",
    progress: 10,
    progressColor: "#1765C4",
    buttonLabel: "Mulai",
    buttonBg: "#1765C4",
    buttonText: "white",
    bg: "/images/modul/bg-strategiLanjutan.jpg",
    cardBg: "linear-gradient(135deg, #e8f0fb 0%, #dce8f8 60%, #c8dbf5 100%)",
    textColor: "#0f2a5e",
    progressLabel: "10% Selesai",
    link: "/Main/modul-belajar/modul-opsional",
  },
];

export default function ModulPage() {
  const router = useRouter();

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-900">
            Modul Belajar
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Belajar Dasar Investasi
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="relative rounded-2xl overflow-hidden shadow-md min-h-[220px] flex flex-col justify-between"
              style={{ background: mod.cardBg }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url('${mod.bg}')` }}
              />

              {/* Icon */}
              <div className="absolute top-4 right-4 opacity-30">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="4" y="28" width="8" height="24" rx="2" fill={mod.textColor === "white" ? "white" : "#1765C4"} />
                  <rect x="16" y="18" width="8" height="34" rx="2" fill={mod.textColor === "white" ? "white" : "#1765C4"} />
                  <rect x="28" y="8" width="8" height="44" rx="2" fill={mod.textColor === "white" ? "white" : "#1765C4"} />
                  <rect x="40" y="20" width="8" height="32" rx="2" fill={mod.textColor === "white" ? "white" : "#1765C4"} />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 flex flex-col h-full gap-3">
                {/* Badge */}
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
                  style={{
                    background: mod.badgeBg,
                    color: mod.badgeText,
                    border:
                      mod.badgeText !== "white"
                        ? `1px solid ${mod.badgeText}`
                        : "none",
                  }}
                >
                  {mod.badge}
                </span>

                {/* Title */}
                <h3
                  className="text-xl font-bold leading-snug mt-1"
                  style={{ color: mod.textColor }}
                >
                  {mod.title}
                </h3>

                {/* Progress */}
                <div className="mt-auto">
                  <p
                    className="text-xs font-medium mb-1.5"
                    style={{
                      color: mod.textColor,
                      opacity: 0.85,
                    }}
                  >
                    {mod.progressLabel}
                  </p>
                  <div
                    className="w-full rounded-full h-2"
                    style={{
                      background:
                        mod.textColor === "white"
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(23,101,196,0.15)",
                    }}
                  >
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${mod.progress}%`,
                        background: mod.progressColor,
                      }}
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => router.push(mod.link)}
                  className="w-full mt-3 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: mod.buttonBg,
                    color: mod.buttonText,
                  }}
                >
                  {mod.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}