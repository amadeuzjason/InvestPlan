"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Fallback: Pastikan profil terbuat dengan saldo 1 Triliun jika trigger gagal / belum dieksekusi
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        virtual_balance: 1000000000000,
      }, { onConflict: 'id' });
    }

    router.push("/verify");
  };

  return (
    <>
      <main className="flex min-h-screen">
        <div className="flex-1 lg:flex-2 relative flex-col justify-center p-12 lg:p-16 overflow-hidden hidden md:flex">
          <Image
            src="/bg.png"
            alt="Background"
            fill
            className="object-cover -z-10"
            loading="eager"
          />
          <div className="absolute inset-0 bg-white/50 z-0" />
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-6xl font-bold text-black mb-2">InvestPlan</h1>
            <p className="max-w-lg text-md lg:text-lg">
              Belajar simulasi investasi saham dan reksadana, serta modul edukasi
              risiko, melalui InvestPlan.
            </p>
          </div>

          <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-8 text-gray-600 font-medium">
            <Link href="../#faq" className="hover:text-blue-600">FAQ</Link>
            <a href="/privacy" className="hover:text-blue-600">Privacy</a>
            <a href="/support" className="hover:text-blue-600">Support</a>
          </nav>
        </div>

        <div className="flex-1 w-[420px] min-h-screen flex items-center justify-center relative p-12">
          <Image
            src="/bg_sign.png"
            alt="Background"
            fill
            className="object-cover -z-10"
            loading="eager"
          />
          <div className="relative z-10 w-full max-w-sm">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-center text-2xl font-bold text-black mb-1">Create Account</h2>
              <p className="text-center text-sm text-gray-500 mb-6">
                Bergabung bersama InvestPlan untuk memulai cerita Anda
              </p>

              <form className="space-y-4" onSubmit={handleSignUp}>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Membuat Akun..." : "Create Account"}
                </button>
              </form>

              <p className="mt-6 text-center text-gray-500 text-sm">
                Already have an account?{" "}
                <a href="/login" className="font-semibold text-black">Login</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}