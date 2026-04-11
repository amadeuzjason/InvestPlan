"use client";

import Image from "next/image";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <>
      <main className="relative min-h-screen w-full">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/30 z-0" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
            {/* Icon Envelope */}
            <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-300 flex items-center justify-center mx-auto mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold mb-2">Verifikasi Email Anda</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Kami telah mengirimkan email verifikasi ke alamat Anda.
              Silakan buka email dan klik tautan verifikasi untuk mengaktifkan akun InvestPlan Anda.
            </p>

            <p className="text-xs text-gray-400 mb-6">
              Tidak menerima email? Periksa folder <strong>Spam</strong> atau coba daftar ulang.
            </p>

            <Link
              href="/login"
              className="inline-block w-full py-3 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Kembali ke Login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
