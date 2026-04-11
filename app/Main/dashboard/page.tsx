"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";
import { createClient } from "@/utils/supabase/client";

const inter = Inter({ subsets: ["latin"] });

// ─── Types ────────────────────────────────────────────────────────────────────
interface Asset {
  id: string;
  nama: string;
  jumlah: number;
  harga_beli: number;
  hargaSaatIniNum: number;
  nilaiTotal: number;
  gainLossNum: number;
  isPositive: boolean;
}

interface Transaction {
  id: string;
  nama_aset: string;
  jenis: "Beli" | "Jual";
  harga_per_unit: number;
  jumlah: number;
  total_nilai: number;
  created_at: string;
}

// ─── Live harga saham (simulasi) ──────────────────────────────────────────────
const fallbackPriceMap: Record<string, number> = {
  BBCA: 6500,
  BBRI: 3350,
  BMRI: 4720,
  TLKM: 3150,
  ADRO: 2490,
  BUMI: 238,
};

function formatRupiah(num: number) {
  return "Rp" + Math.abs(num).toLocaleString("id-ID");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ─── Modal Konfirmasi Jual ────────────────────────────────────────────────────
function KonfirmasiJualModal({
  id,
  asset,
  onClose,
  onConfirm,
}: {
  id: string;
  asset: Asset;
  onClose: () => void;
  onConfirm: (jumlah: number) => void;
}) {
  const [jumlah, setJumlah] = useState<number>(1);
  const totalNilai = jumlah * asset.hargaSaatIniNum;
  const gainLossPerUnit = asset.jumlah > 0 ? asset.gainLossNum / asset.jumlah : 0;
  const saleGainLossNum = Math.round(gainLossPerUnit * jumlah);
  const gainLossLabel =
    saleGainLossNum > 0
      ? `+${formatRupiah(saleGainLossNum)}`
      : `-${formatRupiah(saleGainLossNum)}`;

  return (
    <div id={id} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <h2 className="text-center text-lg font-bold text-gray-900 mb-6">Konfirmasi Penjualan</h2>
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Jumlah Unit</span>
            <input
              type="number"
              min={1}
              max={asset.jumlah}
              value={jumlah}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                if (isNaN(v)) return setJumlah(1);
                if (v < 1) return setJumlah(1);
                if (v > asset.jumlah) return setJumlah(asset.jumlah);
                setJumlah(v);
              }}
              className="text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-44 text-right"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Harga Jual per Unit</span>
            <span className="text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-44 text-right">
              {formatRupiah(asset.hargaSaatIniNum)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Nilai Penjualan</span>
            <span className="text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-44 text-right">
              {formatRupiah(totalNilai)}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-500 space-y-1 mb-7">
          <p>
            Setelah penjualan, total investasi aktif berkurang{" "}
            <span className="font-bold text-gray-900">{formatRupiah(totalNilai)}</span>
          </p>
          <p>
            Total Gain/Loss dari transaksi ini:{" "}
            <span className={`font-semibold ${saleGainLossNum > 0 ? "text-green-500" : "text-red-400"}`}>
              {gainLossLabel}
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(jumlah)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            Konfirmasi Jual
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal Sukses ─────────────────────────────────────────────────────────────
function SuksesModal({ asset, jumlahJual, onClose }: { asset: Asset; jumlahJual: number; onClose: () => void }) {
  const totalNilai = jumlahJual * asset.hargaSaatIniNum;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Penjualan Berhasil!</h2>
        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
          Kamu telah menjual{" "}
          <span className="font-semibold text-gray-700">{asset.nama}</span>{" "}
          sebanyak{" "}
          <span className="font-semibold text-gray-700">{jumlahJual} unit</span>{" "}
          saham dengan total{" "}
          <span className="font-semibold text-gray-700">{formatRupiah(totalNilai)}</span>
        </p>
        <button onClick={onClose} className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
          Kembali
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const supabase = createClient();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [virtualBalance, setVirtualBalance] = useState<number>(0);
  const [modulCount, setModulCount] = useState<number>(0);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [successSell, setSuccessSell] = useState<{ asset: Asset; jumlah: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch portfolio
    const { data: portfolio } = await supabase
      .from("portfolio")
      .select("*")
      .eq("user_id", user.id);

    // Fetch transactions (latest 10)
    const { data: txs } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    // Fetch profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("virtual_balance")
      .eq("id", user.id)
      .single();

    // Fetch modul progress
    const { data: modulProgress } = await supabase
      .from("modul_progress")
      .select("id")
      .eq("user_id", user.id);

    // Check what symbols we need to fetch
    const symbols = Array.from(new Set((portfolio || []).map((p) => p.nama)));
    let livePriceMap: Record<string, number> = { ...fallbackPriceMap };
    
    if (symbols.length > 0) {
      try {
        const res = await fetch(`/api/stock-price?symbols=${symbols.join(",")}`);
        if (res.ok) {
          const fetchedPrices = await res.json();
          livePriceMap = { ...livePriceMap, ...fetchedPrices };
        }
      } catch (err) {
        console.error("Failed to fetch live prices", err);
      }
    }

    // Map portfolio to Asset with live prices
    const mappedAssets: Asset[] = (portfolio || []).map((p) => {
      const hargaSaatIni = livePriceMap[p.nama] ?? p.harga_beli;
      const nilaiTotal = p.jumlah * hargaSaatIni;
      const gainLossNum = (hargaSaatIni - p.harga_beli) * p.jumlah;
      return {
        id: p.id,
        nama: p.nama,
        jumlah: p.jumlah,
        harga_beli: p.harga_beli,
        hargaSaatIniNum: hargaSaatIni,
        nilaiTotal,
        gainLossNum,
        isPositive: gainLossNum >= 0,
      };
    });

    setAssets(mappedAssets);
    setTransactions(txs || []);
    setVirtualBalance(profile?.virtual_balance ?? 0);
    setModulCount((modulProgress || []).length);
    setLoading(false);
  };

  // Simulate live market fluctuation (sebagai fitur simulasi edukasi saat market tutup)
  useEffect(() => {
    if (assets.length === 0) return;
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          // Fluctuate price by -0.5% to +0.5% randomly
          const jitterPercent = (Math.random() - 0.5) * 0.01; 
          const prevPrice = asset.hargaSaatIniNum;
          
          // Memastikan fluktuasi cukup masuk akal untuk dilihat (kenaikan/penurunan minim Rp10 - Rp50 dsb)
          const newPrice = Math.round(prevPrice + (prevPrice * jitterPercent));
          const boundedPrice = newPrice > 0 ? newPrice : prevPrice;

          const nilaiTotal = asset.jumlah * boundedPrice;
          const gainLossNum = (boundedPrice - asset.harga_beli) * asset.jumlah;
          
          return {
            ...asset,
            hargaSaatIniNum: boundedPrice,
            nilaiTotal,
            gainLossNum,
            isPositive: gainLossNum >= 0,
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [assets.length]); // bind to length so it starts once fetched

  useEffect(() => {
    fetchData();
    // Listen for guide events
    const openSell = () => {
      if (assets.length > 0) setSelectedAsset(assets[0]);
    };
    const closeSell = () => setSelectedAsset(null);
    window.addEventListener("guide:open-sell", openSell);
    window.addEventListener("guide:close-sell", closeSell);
    return () => {
      window.removeEventListener("guide:open-sell", openSell);
      window.removeEventListener("guide:close-sell", closeSell);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalInvestasiAktif = assets.reduce((sum, a) => sum + a.nilaiTotal, 0);
  const totalGainLoss = assets.reduce((sum, a) => sum + a.gainLossNum, 0);
  const gainLossPercent =
    totalInvestasiAktif > 0
      ? ((totalGainLoss / (totalInvestasiAktif - totalGainLoss)) * 100).toFixed(1)
      : "0.0";

  const statCards = [
    {
      label: "Total Saldo Virtual",
      value: `Rp ${virtualBalance.toLocaleString("id-ID")}`,
      icon: "/icons/dashboard/saldoVirtual.png",
      bgColor: "#F0F3FF",
      id: "saldo-card",
    },
    {
      label: "Total Investasi Aktif",
      value: `Rp ${totalInvestasiAktif.toLocaleString("id-ID")}`,
      icon: "/icons/dashboard/investAktif.png",
      bgColor: "#D5FFD9",
      id: "investasi-card",
    },
    {
      label: "Total Keuntungan/Kerugian",
      value: (totalGainLoss >= 0 ? "+" : "-") + formatRupiah(totalGainLoss),
      icon: "/icons/dashboard/untungRugi.png",
      badge: `${totalGainLoss >= 0 ? "+" : ""}${gainLossPercent}%`,
      bgColor: "#F0F3FF",
      id: "keuntungan-card",
    },
    {
      label: "Modul yang sudah diselesaikan",
      value: String(modulCount),
      icon: "/icons/dashboard/modul.png",
      bgColor: "#D5E8FF",
      id: "modul-card",
    },
  ];

  const handleConfirmJual = async (jumlah: number) => {
    if (!selectedAsset) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const hargaJual = selectedAsset.hargaSaatIniNum;
    const totalNilai = jumlah * hargaJual;

    // Insert transaksi jual
    await supabase.from("transactions").insert({
      user_id: user.id,
      nama_aset: selectedAsset.nama,
      jenis: "Jual",
      harga_per_unit: hargaJual,
      jumlah,
      total_nilai: totalNilai,
    });

    // Update atau hapus portfolio
    const sisaJumlah = selectedAsset.jumlah - jumlah;
    if (sisaJumlah <= 0) {
      await supabase.from("portfolio").delete().eq("id", selectedAsset.id);
    } else {
      await supabase.from("portfolio").update({ jumlah: sisaJumlah }).eq("id", selectedAsset.id);
    }

    // Tambah saldo virtual
    await supabase
      .from("profiles")
      .update({ virtual_balance: virtualBalance + totalNilai })
      .eq("id", user.id);

    setSuccessSell({ asset: selectedAsset, jumlah });
    setSelectedAsset(null);
    fetchData();
  };

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div id="dashboard-area" className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-400 mt-0.5">Hari ini, {today}</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-rows md:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <div
              id={card.id}
              key={i}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-gray-100 relative"
            >
              {card.badge && (
                <span className={`absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full ${totalGainLoss >= 0 ? "text-green-500 bg-green-50" : "text-red-400 bg-red-50"}`}>
                  {card.badge}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.bgColor }}>
                <Image src={card.icon} alt={card.label} width={20} height={20} className="object-contain" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-tight">{loading ? "—" : card.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Aset yang Dimiliki */}
        <div id="aset-table" className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Aset yang Dimiliki</h3>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-sm text-gray-400 px-6 py-8 text-center">Memuat data...</p>
            ) : assets.length === 0 ? (
              <p className="text-sm text-gray-400 px-6 py-8 text-center">Belum ada aset. Mulai simulasi investasi!</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs font-medium">
                    <th className="text-left px-6 py-3">Nama Aset</th>
                    <th className="text-left px-4 py-3">Jumlah</th>
                    <th className="text-left px-4 py-3">Harga Beli</th>
                    <th className="text-left px-4 py-3">Harga Saat ini</th>
                    <th className="text-left px-4 py-3">Nilai Total</th>
                    <th className="text-left px-4 py-3">Total Gain/Loss</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors duration-100">
                      <td className="px-6 py-3.5 font-semibold text-gray-800">{asset.nama}</td>
                      <td className="px-4 py-3.5 text-gray-600">{asset.jumlah}</td>
                      <td className="px-4 py-3.5 text-gray-600">{formatRupiah(asset.harga_beli)}</td>
                      <td className="px-4 py-3.5 text-gray-600">{formatRupiah(asset.hargaSaatIniNum)}</td>
                      <td className="px-4 py-3.5 text-gray-600">{formatRupiah(asset.nilaiTotal)}</td>
                      <td className={`px-4 py-3.5 font-medium ${asset.isPositive ? "text-green-500" : "text-red-400"}`}>
                        {asset.gainLossNum >= 0 ? "+" : "-"}{formatRupiah(asset.gainLossNum)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            data-open-sell
                            onClick={() => setSelectedAsset(asset)}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Image src="/icons/dashboard/tangan.png" alt="Jual" width={14} height={14} className="object-contain" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Riwayat Transaksi */}
        <div id="transaction-history" className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Riwayat Transaksi Terbaru</h3>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-sm text-gray-400 px-6 py-8 text-center">Memuat data...</p>
            ) : transactions.length === 0 ? (
              <p className="text-sm text-gray-400 px-6 py-8 text-center">Belum ada transaksi.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs font-medium">
                    <th className="text-left px-6 py-3">Nama Aset</th>
                    <th className="text-left px-4 py-3">Jenis</th>
                    <th className="text-left px-4 py-3">Tanggal</th>
                    <th className="text-left px-4 py-3">Harga per Unit</th>
                    <th className="text-left px-4 py-3">Jumlah</th>
                    <th className="text-left px-4 py-3">Total Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors duration-100">
                      <td className="px-6 py-3.5 font-semibold text-gray-800">{tx.nama_aset}</td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tx.jenis === "Beli" ? "bg-blue-50 text-blue-500" : "bg-orange-50 text-orange-500"}`}>
                          {tx.jenis}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500">{formatDate(tx.created_at)}</td>
                      <td className="px-4 py-3.5 text-gray-600">{formatRupiah(tx.harga_per_unit)}</td>
                      <td className="px-4 py-3.5 text-gray-600">{tx.jumlah}</td>
                      <td className="px-4 py-3.5 text-gray-600">{formatRupiah(tx.total_nilai)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal Jual */}
      {selectedAsset && (
        <KonfirmasiJualModal
          id="modal-confirm"
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onConfirm={handleConfirmJual}
        />
      )}
      {successSell && (
        <SuksesModal
          asset={successSell.asset}
          jumlahJual={successSell.jumlah}
          onClose={() => setSuccessSell(null)}
        />
      )}
    </div>
  );
}