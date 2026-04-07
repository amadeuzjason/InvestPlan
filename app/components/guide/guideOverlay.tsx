"use client";

import { useEffect, useState } from "react";

type Mode = "navbar" | "dashboard" | "spotlight" | "focus-large" | "confirm";

export default function GuideOverlay({
  targetId,
  text,
  onNext,
  mode = "spotlight",
}: {
  targetId: string;
  text: string;
  onNext: () => void;
  mode?: Mode;
}) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
  const el = document.getElementById(targetId);
  if (!el) return;

  let frameId: number;
  let timeout: NodeJS.Timeout;

  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  timeout = setTimeout(() => {
    const update = () => {
      const r = el.getBoundingClientRect();
      setRect(r);
      frameId = requestAnimationFrame(update);
    };

    update();
  }, 400);

  return () => {
    cancelAnimationFrame(frameId);
    clearTimeout(timeout);
  };
}, [targetId]);

  if (!rect) return null;

  const isMobile = window.innerWidth < 768;

  // ---------------- Navbar ----------------
  if (mode === "navbar") {
    if (isMobile) {
      const overlayTopHeight = rect.bottom;
      return (
        <>
          <div
            className="absolute bg-white p-4 rounded-xl shadow-lg pointer-events-auto z-[90]"
            style={{ height: overlayTopHeight }}
          />
          <div
            className="absolute bg-black/60 z-40 pointer-events-none"
            style={{
              top: overlayTopHeight,
              left: 0,
              width: "100%",
              height: `calc(100vh - ${overlayTopHeight}px)`,
            }}
          />
          <div
            className="absolute bg-white p-4 rounded-xl shadow-lg pointer-events-auto z-[90]"
            style={{
              top: overlayTopHeight + 16,
              left: 16,
              width: window.innerWidth - 32,
              maxWidth: 320,
            }}
          >
            {text}
            <button
              onClick={onNext}
              className="mt-2 w-full bg-black text-white py-2 rounded"
            >
              Lanjutkan
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="absolute bg-black/60 z-40 pointer-events-none"
            style={{
              top: 0,
              left: rect.right,
              width: `calc(100vw - ${rect.right}px)`,
              height: "100vh",
            }}
          />
          <div
            className="absolute bg-white p-4 rounded-xl shadow-lg pointer-events-auto z-[90]"
            style={{ top: rect.top + 20, left: rect.right + 16, width: 224 }}
          >
            {text}
            <button
              onClick={onNext}
              className="mt-2 w-full bg-black text-white py-2 rounded"
            >
              Lanjutkan
            </button>
          </div>
        </>
      );
    }
  }

  // ---------------- Dashboard ----------------
  if (mode === "dashboard") {
    if (isMobile) {
      const navbar = document.getElementById("navbar-mobile");
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;

      return (
        <>
          <div
            className="absolute bg-black/60 z-40 pointer-events-none"
            style={{ height: navbarHeight }}
          />
          <div
            className="absolute bg-white/5 p-4 rounded-xl shadow-lg pointer-events-auto z-[90]"
            style={{
              top: navbarHeight,
              left: 0,
              width: "100%",
              height: `calc(100vh - ${navbarHeight}px)`,
            }}
          />
          <div
            className="absolute bg-white p-4 rounded-xl shadow-lg pointer-events-auto z-[90]"
            style={{
              top: rect.top + window.scrollY + 16,
              left: 16,
              width: window.innerWidth - 32,
              maxWidth: 320,
            }}
          >
            {text}
            <button
              onClick={onNext}
              className="mt-2 w-full bg-black text-white py-2 rounded"
            >
              Lanjutkan
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="absolute bg-black/60 z-40 pointer-events-none"
            style={{
              top: 0,
              left: 0,
              width: rect.left,
              height: "100vh",
            }}
          />
          <div
            className="absolute bg-white p-4 rounded-xl shadow-lg pointer-events-auto z-[90]"
            style={{
              top: 100,
              left: rect.left + 20,
              width: 256,
            }}
          >
            {text}
            <button
              onClick={onNext}
              className="mt-2 w-full bg-black text-white py-2 rounded"
            >
              Lanjutkan
            </button>
          </div>
        </>
      );
    }
  }

  // ---------------- Spotlight ----------------
  if (mode === "spotlight") {
  const padding = 8; // atau 0 kalau mau tanpa border
  const highlight = {
    top: rect.top - padding + window.scrollY,
    left: rect.left - padding + window.scrollX,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
  };

  const isMobile = window.innerWidth < 768;
  const tooltipWidth = isMobile ? window.innerWidth - 32 : 320;

  const centerX = highlight.left + highlight.width / 2 - tooltipWidth / 2;
  const safeLeft = isMobile
    ? 16
    : Math.max(16, Math.min(centerX, window.innerWidth - tooltipWidth - 16));

  const tooltipHeight = 90;
  let tooltipTop = highlight.top + highlight.height + 16;
  const viewportBottom = window.scrollY + window.innerHeight;
  if (tooltipTop + tooltipHeight > viewportBottom) {
    tooltipTop = highlight.top - tooltipHeight - 16;
  }

  return (
    <>
      {/* Overlay 4 sisi */}
      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{ top: 0, left: 0, width: "100%", height: highlight.top }}
      />
      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{
          top: highlight.top + highlight.height,
          left: 0,
          width: "100%",
          height: `calc(100% - ${highlight.top + highlight.height}px)`,
        }}
      />
      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{
          top: highlight.top,
          left: 0,
          width: highlight.left,
          height: highlight.height,
        }}
      />
      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{
          top: highlight.top,
          left: highlight.left + highlight.width,
          width: `calc(100% - ${highlight.left + highlight.width}px)`,
          height: highlight.height,
        }}
      />

      {/* Highlight card */}
      <div
        className="absolute z-50 pointer-events-none rounded-2xl shadow-xl"
        style={highlight}
      />

      {/* Tooltip */}
      <div
        className="absolute z-50 bg-white px-4 py-3 rounded-xl shadow-xl pointer-events-auto"
        style={{
          width: tooltipWidth,
          top: tooltipTop,
          left: safeLeft,
        }}
      >
        <p className="text-sm text-gray-700 mb-2">{text}</p>
        <button
          onClick={onNext}
          className="bg-black text-white px-4 py-2 rounded-lg w-full"
        >
          Lanjutkan
        </button>
      </div>
    </>
  );
}

  // ---------------- Focus-Large (Aset) ----------------
  if (mode === "focus-large") {
  const padding = 8;

  const highlight = {
    top: rect.top - padding,
    left: rect.left - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
  };

  const isMobile = window.innerWidth < 768;

  const tooltipWidth = isMobile ? window.innerWidth - 32 : 320;

  let centerX = highlight.left + highlight.width / 2 - tooltipWidth / 2;

  const safeLeft = isMobile
    ? 16
    : Math.max(16, Math.min(centerX, window.innerWidth - tooltipWidth - 16));

  const viewportBottom = window.scrollY + window.innerHeight;

  let tooltipTop = highlight.top + highlight.height + 16;
  const tooltipHeight = 90;

  if (tooltipTop + tooltipHeight > viewportBottom) {
    tooltipTop = highlight.top - tooltipHeight - 16;
  }

  return (
    <>
      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: highlight.top,
        }}
      />

      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{
          top: highlight.top + highlight.height,
          left: 0,
          width: "100%",
          height: `calc(100% - ${highlight.top + highlight.height}px)`,
        }}
      />

      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{
          top: highlight.top,
          left: 0,
          width: highlight.left,
          height: highlight.height,
        }}
      />

      <div
        className="absolute bg-black/60 z-40 pointer-events-none"
        style={{
          top: highlight.top,
          left: highlight.left + highlight.width,
          width: `calc(100% - ${highlight.left + highlight.width}px)`,
          height: highlight.height,
        }}
      />

      <div
        className="absolute z-50 pointer-events-none rounded-2xl border-4 border-white shadow-xl"
        style={highlight}
      />

      <div
        className="absolute z-50 bg-white px-4 py-3 rounded-xl shadow-xl pointer-events-auto"
        style={{
          width: tooltipWidth,
          top: tooltipTop,
          left: safeLeft,
        }}
      >
        <p className="text-sm text-gray-700 mb-2">{text}</p>

        <button
          onClick={onNext}
          className="bg-black text-white px-4 py-2 rounded-lg w-full"
        >
          Lanjutkan
        </button>
      </div>
    </>
  );
}

if (mode === "confirm") {
  const highlight = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };

  const isMobile = window.innerWidth < 768;

  const tooltipWidth = isMobile ? window.innerWidth - 32 : 320;

  const centerX = highlight.left + highlight.width / 2 - tooltipWidth / 2;
  const safeLeft = isMobile
    ? 16
    : Math.max(16, Math.min(centerX, window.innerWidth - tooltipWidth - 16));

  const tooltipHeight = 100;
  let tooltipTop = highlight.top + highlight.height + 16;

  if (tooltipTop + tooltipHeight > window.innerHeight) {
    tooltipTop = highlight.top - tooltipHeight - 16;
  }

  return (
    <>
      {/* ATAS */}
      <div
        className="fixed bg-black/60 backdrop-blur-sm z-40"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: highlight.top,
        }}
      />

      {/* BAWAH */}
      <div
        className="fixed bg-black/60 backdrop-blur-sm z-40"
        style={{
          top: highlight.top + highlight.height,
          left: 0,
          width: "100%",
          height: `calc(100vh - ${highlight.top + highlight.height}px)`,
        }}
      />

      {/* KIRI */}
      <div
        className="fixed bg-black/60 backdrop-blur-sm z-40"
        style={{
          top: highlight.top,
          left: 0,
          width: highlight.left,
          height: highlight.height,
        }}
      />

      {/* KANAN */}
      <div
        className="fixed bg-black/60 backdrop-blur-sm z-40"
        style={{
          top: highlight.top,
          left: highlight.left + highlight.width,
          width: `calc(100vw - ${highlight.left + highlight.width}px)`,
          height: highlight.height,
        }}
      />

      {/* TOOLTIP */}
      <div
        className="fixed z-50 bg-white px-4 py-3 rounded-xl shadow-xl"
        style={{
          width: tooltipWidth,
          top: tooltipTop,
          left: safeLeft,
        }}
      >
        <p className="text-sm text-gray-700 mb-3">{text}</p>

        <button
          onClick={onNext}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Lanjutkan
        </button>
      </div>
    </>
  );
}

  return null;
}