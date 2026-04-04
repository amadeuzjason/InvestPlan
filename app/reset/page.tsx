"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const passwordsMatch = password === confirm && password.length > 0;
  const canSubmit = password.length > 0 && passwordsMatch;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // TODO: call API to update password
    router.push("/login");
  }

  return (
    <>
      <main className="relative min-h-screen w-full">
        <Image src="/bg.png" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/30 z-0" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-2">Reset Your Password</h2>

            <p className="text-sm text-gray-500 mb-6">
              Pastikan kata sandi baru yang Anda pilih dapat Anda ingat
            </p>

            <div className="text-left mb-3">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Password"
                required
              />
            </div>

            <div className="text-left mb-6">
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Confirm Password"
                required
              />
              {confirm.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">Password tidak sama.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-3 rounded-md mb-4 transition ${canSubmit ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
