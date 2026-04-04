"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "Apa itu saham?",
    answer:
      "Saham adalah bukti kepemilikan seseorang atas suatu perusahaan. Dengan membeli saham, kamu menjadi salah satu pemilik perusahaan tersebut dan berhak atas sebagian keuntungan dalam bentuk dividen, serta dapat memperoleh capital gain jika harga saham naik.",
  },
  {
    question: "Apa itu reksadana?",
    answer:
      "Reksadana adalah wadah yang menghimpun dana dari banyak investor untuk dikelola oleh Manajer Investasi profesional. Dana tersebut diinvestasikan ke berbagai instrumen seperti saham, obligasi, dan pasar uang. Cocok untuk investor pemula karena dikelola secara profesional.",
  },
  {
    question: "Apa itu diversifikasi?",
    answer:
      "Diversifikasi adalah strategi menyebarkan investasi ke berbagai instrumen atau aset yang berbeda untuk mengurangi risiko. Prinsipnya sederhana: jangan menaruh semua telur dalam satu keranjang. Dengan diversifikasi, kerugian pada satu aset dapat diimbangi oleh keuntungan di aset lain.",
  },
  {
    question: "Apa risiko utama investasi?",
    answer:
      "Risiko utama investasi meliputi: risiko pasar (fluktuasi harga), risiko likuiditas (sulitnya menjual aset), risiko inflasi (nilai uang yang menurun), dan risiko emiten (perusahaan bangkrut). Memahami risiko adalah langkah pertama untuk menjadi investor yang cerdas.",
  },
  {
    question: "Apa perbedaan saham dan reksadana?",
    answer:
      "Saham memberikan kepemilikan langsung atas perusahaan dan dikelola sendiri oleh investor, sehingga membutuhkan pengetahuan lebih mendalam. Reksadana dikelola oleh Manajer Investasi profesional dan lebih terdiversifikasi, cocok untuk pemula dengan modal awal yang lebih terjangkau.",
  },
  {
    question: "Apakah investasi selalu untung?",
    answer:
      "Tidak. Investasi selalu mengandung risiko dan tidak ada jaminan keuntungan. Nilai investasi bisa naik maupun turun tergantung kondisi pasar. Namun dengan strategi yang tepat, diversifikasi portofolio, dan investasi jangka panjang, peluang mendapatkan hasil positif jauh lebih besar.",
  },
  {
    question: "Bagaimana cara memulai investasi?",
    answer:
      "Mulailah dengan: (1) Pelajari dasar-dasar investasi, (2) Tentukan tujuan keuangan kamu, (3) Buka rekening efek atau akun reksadana, (4) Mulai dengan modal kecil, (5) Diversifikasikan portofolio, dan (6) Evaluasi secara berkala. InvestPlan hadir untuk membantumu berlatih tanpa risiko nyata!",
  },
];

export default function WelcomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── STICKY NAVBAR ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 bg-white shadow-sm">
        <Link
          href="/"
          className="text-2xl font-extrabold text-gray-900 tracking-tight"
        >
          InvestPlan
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 text-smP font-medium text-gray-700">
            <Link href="/#faq" className="hover:text-[#194A7A] transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-[#194A7A] transition-colors">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-[#194A7A] transition-colors">
              Support
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-md text-sm font-semibold bg-[#194A7A] text-white hover:bg-[#123a61] active:scale-95 transition-all duration-150"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 rounded-md text-sm font-semibold bg-[#194A7A] text-white hover:bg-[#123a61] active:scale-95 transition-all duration-150"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background */}
          <Image
            src="/bg.png"
            alt="Background"
            fill
            className="object-cover -z-10"
            loading="eager"
          />
        <div className="absolute inset-0 bg-white/50 z-0" />

        <div className="relative z-10 flex flex-col md:pt-0 pt-44 md:pt-0 md:flex-row items-center justify-between px-10 pb-8 max-w-7xl mx-auto gap-10 min-h-screen">
          {/* Left */}
          <div className="flex-1 max-w-xl">
            <h1
              className="font-bold text-gray-900 text-4xl leading-tight mb-5 lg:text-[45px]"
            >
              Belajar Simulasi Investasi
              dengan Cara Mudah
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
              Praktikkan investasi saham dan reksadana, serta pelajari modul
              edukasi risiko melalui InvestPlan.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 rounded-md bg-[#194A7A] text-white font-semibold text-base hover:bg-[#123a61] active:scale-95 transition-all duration-200"
            >
              Mulai Sekarang
            </Link>
          </div>

          {/* Right */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative md:block hidden w-[340px] h-[340px] lg:w-[480px] lg:h-[420px]">
              <Image
                src="/images/welcomePage/main_img.png"
                alt="Ilustrasi Investasi"
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="bg-white py-20 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-center font-semibold text-gray-900 mb-12"
            style={{ fontSize: "28px" }}
          >
            Frequently Asked Question
          </h2>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {i + 1}. {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="px-6 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#194A7A] text-white text-center py-5 text-sm">
        © {new Date().getFullYear()} InvestPlan. All rights reserved.
      </footer>
    </div>
  );
}
