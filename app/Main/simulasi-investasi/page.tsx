"use client";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";
import { createClient } from "@/utils/supabase/client";

const inter = Inter({ subsets: ["latin"] });

const fallbackPriceMap: Record<string, number> = {
  BBCA: 6500,
  BBRI: 3350,
  BMRI: 4720,
  TLKM: 3150,
  ADRO: 2490,
  BUMI: 238,
};

function formatRupiah(num: number) {
  return "Rp" + num.toLocaleString("id-ID");
}

// ─── Purchase Success Modal ────────────────────────────────────────────────────
function PurchaseSuccessModal({
  nama,
  jumlah,
  total,
  onClose,
}: {
  nama: string;
  jumlah: number;
  total: number;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Pembelian Berhasil!</h2>
        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
          Kamu telah membeli{" "}
          <span className="font-semibold text-gray-700">{nama}</span>{" "}
          sebanyak{" "}
          <span className="font-semibold text-gray-700">{jumlah} unit</span>{" "}
          saham dengan total{" "}
          <span className="font-semibold text-gray-700">{formatRupiah(total)}</span>
        </p>
        <button onClick={onClose} className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
          Kembali
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SimulasiInvestasiPage() {
  const supabase = createClient();
  const [selected, setSelected] = useState<string>("");
  const [jumlah, setJumlah] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [successPurchase, setSuccessPurchase] = useState<{ nama: string; jumlah: number; total: number } | null>(null);
  const [virtualSaldo, setVirtualSaldo] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [livePriceMap, setLivePriceMap] = useState<Record<string, number>>(fallbackPriceMap);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data: profile } = await supabase
        .from("profiles")
        .select("virtual_balance")
        .eq("id", user.id)
        .single();
      if (profile) setVirtualSaldo(profile.virtual_balance);

      try {
        const symbols = Object.keys(fallbackPriceMap).join(",");
        const res = await fetch(`/api/stock-price?symbols=${symbols}`);
        if (res.ok) {
          const prices = await res.json();
          setLivePriceMap({ ...fallbackPriceMap, ...prices });
        }
      } catch (e) {
        console.error("Failed to fetch prices", e);
      }
    };
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulate live market fluctuation
  useEffect(() => {
    if (Object.keys(livePriceMap).length === 0) return;
    const interval = setInterval(() => {
      setLivePriceMap((prev) => {
        const nextMap = { ...prev };
        Object.keys(nextMap).forEach((key) => {
          const jitterPercent = (Math.random() - 0.5) * 0.005; // +/- 0.25%
          const prevPrice = nextMap[key];
          const newPrice = Math.round(prevPrice + (prevPrice * jitterPercent));
          nextMap[key] = newPrice > 0 ? newPrice : prevPrice;
        });
        return nextMap;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []); // Only setup once

  const hargaPerUnit = selected ? livePriceMap[selected] ?? 0 : 0;
  const total = jumlah && hargaPerUnit ? Number(jumlah) * hargaPerUnit : 0;

  const handleBeli = async () => {
    setError(null);
    if (!selected) return setError("Pilih saham terlebih dahulu.");
    if (!jumlah || Number(jumlah) < 1) return setError("Masukkan jumlah unit yang valid.");
    if (total > virtualSaldo) return setError("Saldo virtual tidak cukup untuk transaksi ini.");
    if (!userId) return setError("Sesi tidak valid, silakan login ulang.");

    setLoading(true);

    // Cek apakah sudah punya aset ini
    const { data: existing } = await supabase
      .from("portfolio")
      .select("id, jumlah")
      .eq("user_id", userId)
      .eq("nama", selected)
      .single();

    if (existing) {
      // Update jumlah
      await supabase
        .from("portfolio")
        .update({ jumlah: existing.jumlah + Number(jumlah) })
        .eq("id", existing.id);
    } else {
      // Insert baru
      await supabase.from("portfolio").insert({
        user_id: userId,
        nama: selected,
        jumlah: Number(jumlah),
        harga_beli: hargaPerUnit,
      });
    }

    // Insert transaksi
    await supabase.from("transactions").insert({
      user_id: userId,
      nama_aset: selected,
      jenis: "Beli",
      harga_per_unit: hargaPerUnit,
      jumlah: Number(jumlah),
      total_nilai: total,
    });

    // Kurangi saldo virtual
    const newSaldo = virtualSaldo - total;
    await supabase.from("profiles").update({ virtual_balance: newSaldo }).eq("id", userId);
    setVirtualSaldo(newSaldo);

    setSuccessPurchase({ nama: selected, jumlah: Number(jumlah), total });
    setSelected("");
    setJumlah("");
    setLoading(false);
  };

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div id="simulation" className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-900">Simulasi Investasi</h2>
          <p className="text-sm text-gray-400 mt-0.5">Mulai Simulasi Investasi Hari Ini</p>
        </div>

        <div id="buy-invest" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Beli Saham</h3>

          <label className="block text-sm text-gray-600 mb-2">Pilih Nama Aset</label>
          <div className="relative mb-4">
            <button
              type="button"
              id="select-invest"
              onClick={() => setOpenDropdown((s) => !s)}
              className="w-full text-left border border-gray-200 rounded-lg px-4 py-2 bg-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <span className={`truncate ${selected ? "text-gray-800" : "text-gray-400"}`}>
                {selected ? selected : "Pilih Saham"}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
              </svg>
            </button>

            {openDropdown && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-56 overflow-auto">
                {Object.entries(livePriceMap).map(([key, price]) => (
                  <button
                    key={key}
                    onClick={() => { setSelected(key); setError(null); setOpenDropdown(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="font-medium text-gray-800">{key}</div>
                    <div className="text-xs text-gray-400">{formatRupiah(price)} per unit</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="block text-sm text-gray-600 mb-2">Jumlah Unit</label>
          <input
            id="select-unit"
            type="number"
            min={1}
            value={jumlah}
            onChange={(e) => {
              const v = e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value || "0", 10));
              setJumlah(v as number | "");
              setError(null);
            }}
            placeholder="Masukkan jumlah unit"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4"
          />

          <div id="invest-price" className="border-t border-gray-100 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Harga per Unit</span>
              <span className="text-sm font-medium text-gray-800">{formatRupiah(hargaPerUnit)} per Unit</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Nilai Transaksi</span>
              <span className={`text-sm font-semibold ${total > virtualSaldo ? "text-red-500" : "text-gray-900"}`}>
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <div className="flex gap-4 mt-6">
            <button
              id="buy-button"
              onClick={handleBeli}
              disabled={!selected || !jumlah || total > virtualSaldo || loading}
              className={`flex-1 py-3 rounded-xl text-white font-semibold ${
                !selected || !jumlah || total > virtualSaldo || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Memproses..." : "Beli"}
            </button>
            <button
              id="cancel-button"
              onClick={() => { setSelected(""); setJumlah(""); setError(null); }}
              className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
            >
              Batal
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Saldo Virtual: <span className="font-semibold">{formatRupiah(virtualSaldo)}</span>
          </p>
        </div>
      </div>

      {successPurchase && (
        <PurchaseSuccessModal
          nama={successPurchase.nama}
          jumlah={successPurchase.jumlah}
          total={successPurchase.total}
          onClose={() => setSuccessPurchase(null)}
        />
      )}
    </div>
  );
}