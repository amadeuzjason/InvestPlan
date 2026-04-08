"use client";
import { useGuide } from "./useGuide";
import GuideOverlay, { Mode } from "./guideOverlay";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface GuideStep {
  targetId: string;
  text: string;
  mode: Mode;
  route?: string;
}

export default function GuidePage() {
  const { step, nextStep, skip, ready } = useGuide();
  const router = useRouter();
  const pathname = usePathname();
  const [targetReady, setTargetReady] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);

  const guideSteps: GuideStep[] = [
    {
      targetId: isMobile ? "navbar-mobile" : "navbar-desktop",
      text: "Sidebar memudahkan Anda untuk melakukan navigasi kapan saja dan dimana saja.",
      mode: "navbar",
    },
    {
      targetId: "dashboard-area",
      text: "Halaman Dashboard merupakan pusat dari aktivitas akun Anda.",
      mode: "dashboard",
    },
    { targetId: "saldo-card", text: "Disini akan terlampir jumlah total saldo virtual yang Anda miliki.", mode: "spotlight" },
    { targetId: "investasi-card", text: "Disini akan terlampir jumlah total dari investasi aktif yang Anda miliki.", mode: "spotlight" },
    { targetId: "keuntungan-card", text: "Disini akan terlampir total keuntungan/kerugian yang Anda miliki.", mode: "spotlight" },
    { targetId: "modul-card", text: "Disini akan terlampir jumlah modul belajar yang Anda selesaikan.", mode: "spotlight" },
    { targetId: "aset-table", text: "Aset yang Anda miliki di InvestPlan akan terlampir disini. Anda dapat memilih antar menjual atau membeli.", mode: "focus-large" },
    { targetId: "modal-confirm", text: "Anda dapat menjual aset yang Anda miliki. Namun sebelum Anda melakukan penjualan aset, ada baiknya Anda memperhatikan ikhtisar pasar terlebih dahulu untuk mendapatkan profit maksimum.", mode: "confirm"},
    { targetId: "transaction-history", text: "Riwayat transaksi terbaru akan menampilkan sejarah transaksi yang baru saja Anda lakukan.", mode: "spotlight" },
    { targetId: "simulation", text: "Halaman Simulasi Investasi adalah tempat Anda untuk melakukan simulasi investasi dalam melakukan pembelian saham.", mode: "dashboard", route: "/Main/simulasi-investasi" },
    { targetId: "buy-invest", text: "Disini merupakan tempat dimana Anda dapat melakukan simulasi investasi dalam membeli saham.", mode: "focus-large" },
    { targetId: "select-invest", text: "Anda dapat memilih jenis saham apa yang ingin Anda investasikan disini.", mode: "spotlight" },
    { targetId: "select-unit", text: "Setelah memilih jenis saham, Anda dapat memasukkan berapa banyak jumlah unit yang Anda inginkan.", mode: "spotlight" },
    { targetId: "invest-price", text: "Anda dapat melihat harga per unit serta total nilai transaksi dari jenis saham dan jumlah unit yang telah Anda pilih", mode: "spotlight" },
    { targetId: "buy-button", text: "Anda dapat membeli saham.", mode: "spotlight" },
    { targetId: "cancel-button", text: "Anda dapat membatalkannya.", mode: "spotlight" },
    { targetId: "modul-belajar", text: "Halaman Modul Belajar adalah tempat dimana Anda dapat mempelajari dasar-dasar dalam melakukan investasi.", mode:"dashboard", route: "/Main/modul-belajar"},
    { targetId: "card-belajar", text: "Terdapat dua jenis modul belajar. Mandatory merupakan judul belajar yang wajib Anda selesaikan. Sedangkan Opsional merupakan modul belajar yang dapat Anda pelajari untuk memperkaya wawasan Anda dalam dunia investasi.", mode: "focus-large"},
    { targetId: "mandatory-modul", text: "Modul belajar Mandatory merupakan modul belajar wajib Anda selesaikan sebagai bekal Anda dalam menerapkan fundamental dari melakukan investasi bersama InvestPlan.", mode: "focus-large", route: "/Main/modul-belajar/modul-mandatory"},
    { targetId: "opsional-modul", text: "Modul belajar Opsional merupakan modul belajar tidak wajib yang dapat Anda selesaikan sebagai ilmu tambahan agar Anda dapat memperkaya dan memperkuat fundamental Anda dalam melakukan investasi bersama InvestPlan.", mode: "focus-large", route: "/Main/modul-belajar/modul-opsional"},
    { targetId: "account", text: "Halaman Akun adalah tempat dimana Anda dapat melakukan personalisasi terhadap akun InvestPlan Anda.", mode: "dashboard", route: "/Main/akun"},
    { targetId: "account-info", text: "Anda dapat melihat sekilas informasi dari profil Anda disini.", mode: "focus-large"},
    { targetId: "edit-button", text: "Anda dapat melakukan pengubahan pada informasi akun Anda melalui tombol Edit Profil diatas.", mode: "spotlight"},
    { targetId: "edit-profile", text: "Disini, Anda dapat mengubah informasi dari akun Anda. Anda dapat mengunggah foto profil, mengubah nama, dan juga mengganti email Anda.", mode: "confirm"},
    { targetId: "photo-profile", text: "Anda dapat mengunggah foto profil Anda melalui ikon kamera di samping foto profil Anda yang sebelumnya.", mode: "spotlight"},
    { targetId: "edit-name", text: "Anda dapat mengubah nama pengguna Anda di kolom nama.", mode: "spotlight"},
    { targetId: "edit-email", text: "Kemudian Anda dapat mengubah email pengguan Anda di kolom email.", mode: "spotlight"},
    { targetId: "save-change", text: "Anda dapat menyimpan perubahan yang telah Anda lakukan terhadap informasi pengguna Anda dengan menekan tombol Simpan Perubahan.", mode: "confirm"},
  ];

  const currentStep = step === 0 ? null : guideSteps[step - 1];

  useEffect(() => {
  if (!currentStep) return;

  // ===== OPEN =====
  if (currentStep.targetId === "modal-confirm") {
    window.dispatchEvent(new Event("guide:open-sell"));
  }

  if (currentStep.targetId === "edit-profile") {
    window.dispatchEvent(new Event("guide:open-edit"));
  }

  // ===== CLOSE (step berikutnya) =====
  if (currentStep.targetId === "transaction-history") {
    window.dispatchEvent(new Event("guide:close-sell"));
  }

  if (currentStep.targetId === "account-info") {
    window.dispatchEvent(new Event("guide:close-edit"));
  }

}, [currentStep]);

  useEffect(() => {
  setTargetReady(false);
}, [step]);

// HANDLE ROUTE + TARGET
useEffect(() => {
  if (!currentStep?.targetId) return;

  let cancelled = false;

  const run = async () => {
    // pindah halaman kalau perlu
    if (currentStep.route && pathname !== currentStep.route) {
      router.push(currentStep.route);
      return;
    }

    await new Promise((res) => setTimeout(res, 400));

    let attempts = 0;

    const interval = setInterval(() => {
      if (cancelled) return;

      const el = document.getElementById(currentStep.targetId);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          if (!cancelled) setTargetReady(true);
        }, 150);

        clearInterval(interval);
      }

      attempts++;

      if (attempts > 25) {
        console.warn("Element tidak ditemukan:", currentStep.targetId);
        setTargetReady(true);
        clearInterval(interval);
      }
    }, 200);
  };

  run();

  return () => {
    cancelled = true;
  };
}, [currentStep, pathname, router]);

  const handleNext = () => nextStep();

  // ===== STEP 0 - Welcome =====
  if (step === 0) {
    return (
      <div className="fixed inset-0 z-[50] flex items-center justify-center px-4 pointer-events-auto">
        <div className="absolute inset-0 bg-black/60" />
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl z-50">
          <h1 className="text-lg font-semibold mb-2">Selamat datang di InvestPlan</h1>
          <p className="text-sm text-gray-500 mb-4">
            Kami akan memandu Anda mengenai tata cara menggunakan dan memaksimalkan InvestPlan.
          </p>
          <div className="flex gap-2">
            <button onClick={skip} className="w-full bg-gray-200 py-2 rounded">Lewati</button>
            <button onClick={() => nextStep(1)} className="w-full bg-black text-white py-2 rounded">Lanjutkan</button>
          </div>
        </div>
      </div>
    );
  }

  // ==== END ====
  if (step === 29) {
  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">

        {/* Icon sukses */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-green-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold mb-2">
          Panduan Selesai 🎉
        </h1>

        {/* Desc */}
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Anda sudah memahami dasar penggunaan InvestPlan. 
          Sekarang Anda siap mulai berinvestasi 🚀
        </p>

        {/* Button */}
        <button
          onClick={skip}
          className="w-full bg-black text-white py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
}

  // jangan render overlay sebelum target siap
  if (!currentStep || (currentStep.targetId && !targetReady)) return null;

  return (
    <GuideOverlay
      targetId={currentStep.targetId}
      text={currentStep.text}
      mode={currentStep.mode}
      onNext={handleNext}
    />
  );
}