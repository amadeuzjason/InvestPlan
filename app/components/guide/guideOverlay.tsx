"use client";

import { useEffect, useState } from "react";

export type Mode =
  | "navbar"
  | "dashboard"
  | "spotlight"
  | "focus-large"
  | "confirm";

interface GuideOverlayProps {
  targetId: string;
  text: string;
  onNext: () => void;
  mode: Mode;
}

export default function GuideOverlay({
  targetId,
  text,
  onNext,
  mode,
}: GuideOverlayProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const handleNextClick = () => {
  window.dispatchEvent(new Event("guide:next"));

  onNext();
};

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let frameId: number;
    const update = () => {
      const r = el.getBoundingClientRect();
      setRect(r);
      frameId = requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(frameId);
  }, [targetId]);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // =============================
  // CONFIRM
  // =============================
  if (mode === "confirm") {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center z-10">
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
          {text}
        </p>

        <button
          onClick={handleNextClick}
          className="w-full bg-black text-white py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}

  // =============================
  // MODE NORMAL (SPOTLIGHT)
  // =============================
  if (!rect) return null;

  // tooltip positioning
  let tooltipWidth = isMobile ? window.innerWidth - 32 : 260;
  let tooltipLeft =
    rect.left + rect.width / 2 - tooltipWidth / 2;
  tooltipLeft = Math.max(
    16,
    Math.min(
      tooltipLeft,
      window.innerWidth - tooltipWidth - 16
    )
  );

  let tooltipTop = rect.bottom + 16;
  if (tooltipTop + 120 > window.innerHeight)
    tooltipTop = rect.top - 120 - 16;
  if (tooltipTop < 16)
    tooltipTop = window.innerHeight / 2 - 60;

  return (
  <>
    {/* Overlay gelap */}
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        className="absolute bg-black/60 backdrop-blur-[2px]"
        style={{ top: 0, left: 0, width: "100%", height: rect.top }}
      />
      <div
        className="absolute bg-black/60 backdrop-blur-[2px]"
        style={{
          top: rect.bottom,
          left: 0,
          width: "100%",
          height: `calc(100% - ${rect.bottom}px)`,
        }}
      />
      <div
        className="absolute bg-black/60 backdrop-blur-[2px]"
        style={{
          top: rect.top,
          left: 0,
          width: rect.left,
          height: rect.height,
        }}
      />
      <div
        className="absolute bg-black/60 backdrop-blur-[2px]"
        style={{
          top: rect.top,
          left: rect.right,
          width: `calc(100% - ${rect.right}px)`,
          height: rect.height,
        }}
      />
    </div>

    {/* Highlight */}
    <div
      className="fixed z-50 pointer-events-none rounded-2xl ring-4 ring-white/80 shadow-[0_0_0_8px_rgba(255,255,255,0.12)] transition-all duration-300"
      style={{
        top: rect.top - 6,
        left: rect.left - 6,
        width: rect.width + 12,
        height: rect.height + 12,
      }}
    />

    {/* Tooltip */}
    <div
      className="fixed z-[60] bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto transition-all duration-300"
      style={{
        width: tooltipWidth,
        top: tooltipTop,
        left: tooltipLeft,
      }}
    >
      {/* Title kecil */}
      <p className="text-xs font-semibold text-gray-400 mb-1">
        Panduan
      </p>

      {/* Text */}
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        {text}
      </p>

      {/* Button */}
      <button
        onClick={handleNextClick}
        className="w-full bg-black text-white py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
      >
        Lanjutkan
      </button>
    </div>
  </>
);
}