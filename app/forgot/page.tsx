"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // navigate to reset page (ke halaman reset)
    router.push("/reset");
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
            <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>

            <p className="text-sm text-gray-500 mb-6">
              Silakan konfirmasi email Anda untuk menerima tautan atur ulang kata sandi.
            </p>

            <div className="text-left mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
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

            <button
              type="submit"
              className={"w-full py-3 rounded-md mb-4 transition bg-black text-white"}>
              Confirm
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
