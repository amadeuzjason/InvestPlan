"use client";

import Image from "next/image";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { createClient } = await import("@/utils/supabase/client");
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <>
      <main className="relative min-h-screen w-full">
        <Image src="/bg.png" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/30 z-0" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          {sent ? (
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-green-50 border-4 border-green-400 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Email Terkirim!</h2>
              <p className="text-sm text-gray-500">
                Kami telah mengirimkan tautan reset password ke <strong>{email}</strong>. Silakan cek inbox Anda.
              </p>
              <a href="/login" className="mt-6 inline-block text-sm font-medium text-black hover:underline">
                Kembali ke Login
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200"
            >
              <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
              <p className="text-sm text-gray-500 mb-6">
                Silakan konfirmasi email Anda untuk menerima tautan atur ulang kata sandi.
              </p>

              <div className="text-left mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-3 text-left">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md mb-4 transition bg-black text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Mengirim..." : "Confirm"}
              </button>

              <a href="/login" className="text-sm text-gray-500 hover:underline">Kembali ke Login</a>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
