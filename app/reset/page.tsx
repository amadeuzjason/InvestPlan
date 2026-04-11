"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Supabase mengirim token via URL hash saat pengguna klik link di email.
  // @supabase/ssr secara otomatis mendeteksi ini via onAuthStateChange.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // Pengguna sudah terautentikasi dengan token recovery — siap reset password
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const passwordsMatch = password === confirm && password.length > 0;
  const canSubmit = password.length >= 6 && passwordsMatch;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  return (
    <>
      <main className="relative min-h-screen w-full">
        <Image src="/bg.png" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/30 z-0" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          {success ? (
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-green-50 border-4 border-green-400 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Password Berhasil Diubah!</h2>
              <p className="text-sm text-gray-500">Mengalihkan ke halaman login...</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200"
            >
              <h2 className="text-2xl font-semibold mb-2">Reset Your Password</h2>
              <p className="text-sm text-gray-500 mb-6">
                Pastikan kata sandi baru yang Anda pilih dapat Anda ingat
              </p>

              <div className="text-left mb-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Minimal 6 karakter"
                  required
                />
              </div>

              <div className="text-left mb-6">
                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Ulangi password baru"
                  required
                />
                {confirm.length > 0 && !passwordsMatch && (
                  <p className="text-xs text-red-500 mt-1">Password tidak sama.</p>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-4 text-left">{error}</p>
              )}

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className={`w-full py-3 rounded-md mb-4 transition ${
                  canSubmit && !loading
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? "Menyimpan..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
