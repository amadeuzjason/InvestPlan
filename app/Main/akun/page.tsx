"use client";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";
import { createClient } from "@/utils/supabase/client";

const inter = Inter({ subsets: ["latin"] });

// ─── Edit Profile Modal ────────────────────────────────────────────────────────
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
    <div id="edit-profile" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              id="photo-profile"
              src={avatarPreview || "/Profil.png"}
              alt="avatar"
              width={120}
              height={120}
              className="rounded-full object-cover w-[120px] h-[120px]"
            />
            <label
              htmlFor={fileInputId}
              className="absolute -bottom-1 -right-1 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <p className="text-sm text-gray-500 mt-3">Klik ikon kamera untuk mengunggah foto baru</p>
        </div>

        <label className="text-sm text-gray-600">Nama</label>
        <input
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 mt-1"
        />

        <label className="text-sm text-gray-600">Email</label>
        <input
          id="edit-email"
          value={email}
          disabled
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 mt-1 bg-gray-50 text-gray-400 cursor-not-allowed"
        />
        <p className="text-xs text-gray-400 -mt-4 mb-6">Email tidak dapat diubah.</p>

        <button
          id="save-change"
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
  const supabase = createClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string>("/Profil.png");
  const [joinedAt, setJoinedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setEmail(user.email ?? "");

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, created_at")
      .eq("id", user.id)
      .single();

    if (profile) {
      setName(profile.full_name ?? "");
      setAvatar(profile.avatar_url || "/Profil.png");
      const date = new Date(profile.created_at);
      setJoinedAt(
        date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    const open = () => setModalOpen(true);
    const close = () => setModalOpen(false);
    window.addEventListener("guide:open-edit", open);
    window.addEventListener("guide:close-edit", close);
    return () => {
      window.removeEventListener("guide:open-edit", open);
      window.removeEventListener("guide:close-edit", close);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (newName: string, _email: string, newAvatar: string) => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    await supabase
      .from("profiles")
      .update({ full_name: newName, avatar_url: newAvatar })
      .eq("id", user.id);

    setName(newName);
    setAvatar(newAvatar);
    setModalOpen(false);
    setSaving(false);
  };

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div id="account" className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-900">Akun Saya</h2>
          <p className="text-sm text-gray-400 mt-0.5">Kelola Informasi Pribadi dan Pengaturan Akun</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div id="account-info" className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            {/* Header Info + Button */}
            <div className="flex flex-row items-center justify-between mb-6 gap-3">
              <div>
                <h4 className="text-base font-semibold text-gray-900">Informasi Pengguna</h4>
                <div className="h-px bg-gray-100 mt-3" />
              </div>
              <div className="pt-1 self-start sm:self-auto">
                <button
                  id="edit-button"
                  onClick={() => setModalOpen(true)}
                  className="bg-black text-white px-4 py-2 rounded-xl font-semibold"
                >
                  Edit Profil
                </button>
              </div>
            </div>

            {/* User Info */}
            {loading ? (
              <p className="text-sm text-gray-400 py-4">Memuat profil...</p>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <div className="rounded-full overflow-hidden ring-2 ring-gray-100">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="object-cover w-24 h-24 sm:w-20 sm:h-20"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{name || "—"}</h3>
                  <p className="text-sm text-gray-600 mt-1">{email}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Bergabung sejak:{" "}
                    <span className="font-medium text-gray-600">{joinedAt || "—"}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {modalOpen && (
          <EditProfileModal
            initialName={name}
            initialEmail={email}
            initialAvatar={avatar}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
          />
        )}

        {saving && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-xl px-6 py-4 text-sm text-gray-700 font-medium shadow-lg">
              Menyimpan...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}