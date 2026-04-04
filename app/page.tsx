import FAQ from "./components/sections/FAQ"
import './globals.css'
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
    <main className="relative z-10">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white fixed top-0 left-0 right-0 z-20">
        <h1 className="text-2xl font-bold text-[#194a7a]">InvestPlan</h1>
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#faq" className="hover:textblue-600">FAQ</a>
            <a href="#privacy" className="hover:textblue-600">Privacy</a>
            <a href="#support" className="hover:textblue-600">Support</a>
          </nav>
          <div className="flex gap-4">
            <Link href="/login" className="px-5 py-2 rounded-lg border border-[#194a7a] text-[#194a7a] font-semibold hover:bg-[#194a7a] hover:text-white transition cursor-pointer">
              Login
            </Link>
            <Link href="/signup" className="px-5 py-2 rounded-lg text-white font-semibold bg-[#194a7a] hover:bg-[#476F95] transition cursor-pointer">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 justify-center h-screen px-6 max-w-7xl mx-auto">
        {/* Kolom kiri: teks */}
        <div className="text-center md:text-left">
          <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold mb-6 text-gray-900">
            Belajar Simulasi Investasi dengan Cara Mudah
          </h2>
          <p className="max-w-xl text-lg md:text-xl text-gray-700 mb-10">
            Praktikkan investasi saham dan reksadana, serta pelajari modul edukasi risiko melalui InvestPlan.
          </p>
          <Link href='/login' className="bg-[#194a7a] hover:bg-[#476F95] text-white px-10 py-4 rounded-lg text-xl font-semibold transition cursor-pointer">
            Mulai Sekarang
          </Link>
        </div>

        {/* Kolom kanan: gambar hero */}
        <div className="flex justify-center lg:w-5xl md:w-3xl md:justify-end md:block hidden">
          <Image
            src="/main_img.png"
            alt="Ilustrasi Investasi"
            width={800}
            height={800 }
            priority
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto">
        <FAQ />
      </section>
    </main>
    </>
  )
}
