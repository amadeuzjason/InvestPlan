"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";

const inter = Inter({ subsets: ["latin"] });

function EditProfileModal({
  initialName,
  initialEmail,
  initialAvatar,
  onClose,
  onSave,
}: {
  initialName: string;
  initialEmail: string;
  initialAvatar: string;
  onClose: () => void;
  onSave: (name: string, email: string, avatarUrl: string) => void;
}) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [avatarPreview, setAvatarPreview] = useState<string>(initialAvatar);

  const fileInputId = "edit-avatar-input";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={avatarPreview}
              alt="avatar"
              width={120}
              height={120}
              className="rounded-full object-cover w-[120px] h-[120px]"
            />
            <label
              htmlFor={fileInputId}
              className="absolute -bottom-1 -right-1 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2z" />
              </svg>
            </label>
            <input
              id={fileInputId}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Klik ikon kamera untuk mengunggah foto baru
          </p>
        </div>

        <label className="text-sm text-gray-600">Nama</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 mt-1"
        />

        <label className="text-sm text-gray-600">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 mt-1"
        />

        <button
          onClick={() => onSave(name, email, avatarPreview)}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AkunPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("Rizky Pratama");
  const [email, setEmail] = useState("rizky.pratama@gmail.com");
  const [avatar, setAvatar] = useState<string>("/Profil.png");

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-900">Akun Saya</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola Informasi Pribadi dan Pengaturan Akun
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            {/* Header Info + Button */}
            <div className="flex flex-row items-center justify-between mb-6 gap-3">
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  Informasi Pengguna
                </h4>
                <div className="h-px bg-gray-100 mt-3" />
              </div>

              <div className="pt-1 self-start sm:self-auto">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-black text-white px-4 py-2 rounded-xl font-semibold"
                >
                  Edit Profil
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="rounded-full overflow-hidden ring-2 ring-gray-100">
                <img
                  src={avatar}
                  alt="avatar"
                  className="object-cover w-24 h-24 sm:w-20 sm:h-20"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600 mt-1">{email}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Bergabung sejak:{" "}
                  <span className="font-medium text-gray-600">
                    27 Januari 2026
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {modalOpen && (
          <EditProfileModal
            initialName={name}
            initialEmail={email}
            initialAvatar={avatar}
            onClose={() => setModalOpen(false)}
            onSave={(n, e, a) => {
              setName(n);
              setEmail(e);
              setAvatar(a);
              setModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}