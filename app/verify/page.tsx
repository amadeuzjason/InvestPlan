"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const otpLength = 6;

export default function VerifyOTP() {
  const router = useRouter();
  //isi otp
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [countdown, setCountdown] = useState(0);
  const [status, setStatus] = useState("");

  const inputOtp = useRef<(HTMLInputElement | null)[]>([]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleInputOtp = (value: string, index: number) => {
    //cek otp apakah angka dan huruf
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //pindah ke kanan saat isi
    if (value && index < otpLength - 1) {
      inputOtp.current[index + 1]?.focus();
    }
  };

  //pindah ke kiri saat hapus
  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputOtp.current[index - 1]?.focus();
    }
  };

  const handleResent = () => {
    if (countdown > 0) return;
    setStatus("code has been resent.");
    setCountdown(120);
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOtpComplete) return;
    router.push("/Main/dashboard");
  };

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
        <div className="absolute inset-0 bg-white/30 z-0"/>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="w-[420px] bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">Verify Your Account</h2>

            <p className="text-sm text-gray-500 mb-6">
              Kami telah mengirimkan kode verifikasi ke email Anda
            </p>

            <div className="flex justify-center gap-3 mb-6">
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputOtp.current[i] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleInputOtp(e.target.value, i)}
                  onKeyDown={(e) => handleBackspace(e, i)}
                  className="w-12 h-12 border rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!isOtpComplete}
              className={`w-full py-3 rounded-md mb-4 transition 
             ${
               isOtpComplete
                 ? "bg-black text-white"
                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
             }`}
            >
              Confirm
            </button>

            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-400">Resend in {countdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResent}
                  className="font-medium text-black"
                >
                  Resend
                </button>
              )}
            </p>

            {status && <p className="text-xs text-gray-400 mt-2">{status}</p>}
          </form>
        </div>
      </main>
    </>
  );
}
