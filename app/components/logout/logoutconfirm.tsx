"use client";

import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutConfirm({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-2xl shadow-xl w-[360px] p-6 animate-fadeIn">
          <h3 className="font-semibold text-lg mb-2">Keluar Akun</h3>
          <p className="mb-6 text-gray-700">
            Apakah Anda yakin ingin keluar dari akun Anda?
          </p>

          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              onClick={onClose}
            >
              Kembali
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={onConfirm}
            >
              Ya, Saya yakin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}