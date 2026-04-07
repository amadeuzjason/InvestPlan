"use client";

import { useGuide } from "./useGuide";
import GuideOverlay from "./guideOverlay";

export default function GuidePage() {
  const { step, nextStep, skip, ready } = useGuide();

  if (step === -1 || !ready) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none">
      {/* STEP 0 - Welcome */}
      {step === 0 && (
        <>
          <div className="absolute inset-0 bg-black/60 pointer-events-auto" />
          <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-auto">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
              <h1 className="text-lg font-semibold mb-2">
                Selamat datang di InvestPlan
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Kami akan memandu Anda mengenai tata cara menggunakan dan memaksimalkan InvestPlan.
              </p>
              <div className="flex gap-2">
                <button onClick={skip} className="w-full bg-gray-200 py-2 rounded">
                  Lewati
                </button>
                <button onClick={nextStep} className="w-full bg-black text-white py-2 rounded">
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* STEP 1 - Navbar */}
      {step === 1 && (
        <GuideOverlay
          targetId={isMobile ? "navbar-mobile" : "navbar-desktop"}
          text="Sidebar memudahkan Anda untuk melakukan navigasi kapan saja dan dimana saja."
          onNext={nextStep}
          mode="navbar"
        />
      )}

      {/* STEP 2 - Dashboard */}
      {step === 2 && (
        <GuideOverlay
          targetId="dashboard-area"
          text="Halaman Dashboard merupakan pusat dari aktivitas akun Anda."
          onNext={nextStep}
          mode="dashboard"
        />
      )}

      {/* STEP 3-6 - Spotlight Cards */}
      {step === 3 && <GuideOverlay targetId="saldo-card" text="Disini akan terlampir jumlah total saldo virtual yang Anda miliki." onNext={nextStep} mode="spotlight" />}
      {step === 4 && <GuideOverlay targetId="investasi-card" text="Disini akan terlampir jumlah total dari investasi aktif yang Anda miliki." onNext={nextStep} mode="spotlight" />}
      {step === 5 && <GuideOverlay targetId="keuntungan-card" text="Disini akan terlampir total keuntungan/kerugian yang Anda miliki." onNext={nextStep} mode="spotlight" />}
      {step === 6 && <GuideOverlay targetId="modul-card" text="Disini akan terlampir jumlah modul belajar yang Anda selesaikan." onNext={nextStep} mode="spotlight" />}
      
      {/* STEP 7 - ASET*/}
      {step === 7 && <GuideOverlay targetId="aset-table" text="Aset yang Anda miliki di InvestPlan akan terlampir disini. Anda dapat memilih antar menjual atau membeli." onNext={nextStep} mode="focus-large"/>}

{/* step 8 - jual (belum selesai*/}
      {step === 8 && <GuideOverlay
      targetId="modal-confirm"
      text="Anda dapat menjual aset yang Anda miliki. Namun sebelum Anda melakukan penjualan aset, ada baiknya Anda memerhatikan ikhtisar pasar terlebih dahulu untuk mendapatkan rpofit maksimum."
      onNext={nextStep}
      mode="confirm"/>}

      {/* STEP 10 - Done */}
      {step === 10 && (
        <>
          <div className="absolute inset-0 bg-black/60 pointer-events-auto" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <div className="bg-white p-6 rounded-2xl text-center shadow-xl">
              <h2 className="font-semibold mb-2">🎉 Selesai</h2>
              <button onClick={skip} className="bg-black text-white px-4 py-2 rounded">
                Mulai
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}