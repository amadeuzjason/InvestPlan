"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";

const inter = Inter({ subsets: ["latin"] });

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: string;
  icon: string;
  badge?: string;
  bgColor: string;
}

interface Asset {
  nama: string;
  jumlah: number;
  hargaBeli: string;
  hargaSaatIni: string;
  nilaiTotal: string;
  gainLoss: string;
  gainLossNum: number;
  isPositive: boolean;
  hargaSaatIniNum: number;
  jumlahNum: number;
}

interface Transaction {
  namaAset: string;
  jenis: "Beli" | "Jual";
  tanggal: string;
  hargaPerUnit: string;
  jumlah: number;
  totalNilai: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const statCards: StatCard[] = [
  {
    label: "Total Saldo Virtual",
    value: "Rp. 9.200.000",
    icon: "/icons/dashboard/saldoVirtual.png",
    bgColor: "#F0F3FF",
  },
  {
    label: "Total Investasi Aktif",
    value: "Rp. 1.344.900",
    icon: "/icons/dashboard/investAktif.png",
    bgColor: "#D5FFD9",
  },
  {
    label: "Total Keuntungan/Kerugian",
    value: "Rp. 5.450",
    icon: "/icons/dashboard/untungRugi.png",
    badge: "+0.4%",
    bgColor: "#F0F3FF",
  },
  {
    label: "Modul yang sudah diselesaikan",
    value: "2",
    icon: "/icons/dashboard/modul.png",
    bgColor: "#D5E8FF",
  },
];

const assets: Asset[] = [
  {
    nama: "BBCA",
    jumlah: 50,
    jumlahNum: 50,
    hargaBeli: "Rp6.875",
    hargaSaatIni: "Rp6.500",
    hargaSaatIniNum: 6500,
    nilaiTotal: "Rp325.000",
    gainLoss: "-Rp18.750",
    gainLossNum: -18750,
    isPositive: false,
  },
  {
    nama: "BBRI",
    jumlah: 60,
    jumlahNum: 60,
    hargaBeli: "Rp3.510",
    hargaSaatIni: "Rp3.350",
    hargaSaatIniNum: 3350,
    nilaiTotal: "Rp201.000",
    gainLoss: "-Rp9.600",
    gainLossNum: -9600,
    isPositive: false,
  },
  {
    nama: "ADRO",
    jumlah: 120,
    jumlahNum: 120,
    hargaBeli: "Rp2.480",
    hargaSaatIni: "Rp2.490",
    hargaSaatIniNum: 2490,
    nilaiTotal: "Rp298.800",
    gainLoss: "+Rp1.200",
    gainLossNum: 1200,
    isPositive: true,
  },
  {
    nama: "BUMI",
    jumlah: 200,
    jumlahNum: 200,
    hargaBeli: "Rp210",
    hargaSaatIni: "Rp238",
    hargaSaatIniNum: 238,
    nilaiTotal: "Rp47.600",
    gainLoss: "+Rp5.600",
    gainLossNum: 5600,
    isPositive: true,
  },
  {
    nama: "TLKM",
    jumlah: 150,
    jumlahNum: 150,
    hargaBeli: "Rp2.970",
    hargaSaatIni: "Rp3.150",
    hargaSaatIniNum: 3150,
    nilaiTotal: "Rp472.500",
    gainLoss: "+Rp27.000",
    gainLossNum: 27000,
    isPositive: true,
  },
];

const transactions: Transaction[] = [
  {
    namaAset: "BBCA",
    jenis: "Beli",
    tanggal: "13/03/2026",
    hargaPerUnit: "Rp6.875",
    jumlah: 50,
    totalNilai: "Rp343.750",
  },
  {
    namaAset: "BBRI",
    jenis: "Jual",
    tanggal: "13/03/2026",
    hargaPerUnit: "Rp3.510",
    jumlah: 60,
    totalNilai: "Rp210.600",
  },
  {
    namaAset: "ADRO",
    jenis: "Beli",
    tanggal: "13/03/2026",
    hargaPerUnit: "Rp2.480",
    jumlah: 120,
    totalNilai: "Rp297.600",
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function formatRupiah(num: number) {
  return "Rp" + num.toLocaleString("id-ID");
}

// ─── Modal Konfirmasi Jual ────────────────────────────────────────────────────
function KonfirmasiJualModal({
  asset,
  onClose,
  onConfirm,
}: {
  asset: Asset;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const totalNilai = asset.jumlahNum * asset.hargaSaatIniNum;
  const gainLossLabel = asset.isPositive
    ? `+${formatRupiah(asset.gainLossNum)}`
    : formatRupiah(asset.gainLossNum);

  return (
    // Backdrop dengan blur
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <h2 className="text-center text-lg font-bold text-gray-900 mb-6">
          Konfirmasi Penjualan
        </h2>

        {/* Info rows */}
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Jumlah Unit</span>
            <span className="text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-44 text-right">
              {asset.jumlahNum}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Harga Jual per Unit</span>
            <span className="text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-44 text-right">
              {asset.hargaSaatIni}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Nilai Penjualan</span>
            <span className="text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-44 text-right">
              {formatRupiah(totalNilai)}
            </span>
          </div>
        </div>

        {/* Info tambahan */}
        <div className="text-sm text-gray-500 space-y-1 mb-7">
          <p>
            Setelah penjualan, total investasi aktif berkurang{" "}
            <span className="font-bold text-gray-900">
              {formatRupiah(totalNilai)}
            </span>
          </p>
          <p>
            Total Gain/Loss dari transaksi ini:{" "}
            <span
              className={`font-semibold ${
                asset.isPositive ? "text-green-500" : "text-red-400"
              }`}
            >
              {gainLossLabel}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
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
function SuksesModal({
  asset, onClose,
}: {
  asset: Asset;
  onClose: () => void;
}) {
  const totalNilai = asset.jumlahNum * asset.hargaSaatIniNum;
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 flex flex-col items-center text-center">
        {/* Icon centang hijau */}
        <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
 
        <h2 className="text-xl font-bold text-gray-900 mb-2">Penjualan Berhasil!</h2>
        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
          Kamu telah menjual{" "}
          <span className="font-semibold text-gray-700">{asset.nama}</span>{" "}
          sebanyak{" "}
          <span className="font-semibold text-gray-700">{asset.jumlahNum} unit</span>{" "}
          saham dengan total{" "}
          <span className="font-semibold text-gray-700">{formatRupiah(totalNilai)}</span>
        </p>
 
        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
 

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [successAsset, setSuccessAsset] = useState<Asset | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleConfirmJual = () => {
  if (!selectedAsset) return

  console.log("Jual dikonfirmasi:", selectedAsset.nama)

  setSuccessAsset(selectedAsset) // tampilkan sukses
  setSelectedAsset(null)         // tutup modal konfirmasi
}

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-400 mt-0.5">Hari ini, {today}</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-gray-100 relative"
            >
              {card.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
              )}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: card.bgColor }}
              >
                <Image
                  src={card.icon}
                  alt={card.label}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-tight">
                  {card.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Aset yang Dimiliki */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">
              Aset yang Dimiliki
            </h3>
          </div>
          <div className="overflow-x-auto">
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
                {assets.map((asset, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50 transition-colors duration-100"
                  >
                    <td className="px-6 py-3.5 font-semibold text-gray-800">
                      {asset.nama}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{asset.jumlah}</td>
                    <td className="px-4 py-3.5 text-gray-600">{asset.hargaBeli}</td>
                    <td className="px-4 py-3.5 text-gray-600">{asset.hargaSaatIni}</td>
                    <td className="px-4 py-3.5 text-gray-600">{asset.nilaiTotal}</td>
                    <td
                      className={`px-4 py-3.5 font-medium ${
                        asset.isPositive ? "text-green-500" : "text-red-400"
                      }`}
                    >
                      {asset.gainLoss}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {/* Keranjang (Beli) — bg hitam, icon putih */}
                        <button className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition-colors">
                          <Image
                            src="/icons/dashboard/keranjang.png"
                            alt="Beli"
                            width={14}
                            height={14}
                            className="object-contain"
                          />
                        </button>
                        <button
                          onClick={() => setSelectedAsset(asset)}
                          className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Image
                            src="/icons/dashboard/tangan.png"
                            alt="Jual"
                            width={14}
                            height={14}
                            className="object-contain"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Riwayat Transaksi Terbaru */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">
              Riwayat Transaksi Terbaru
            </h3>
          </div>
          <div className="overflow-x-auto">
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
                {transactions.map((tx, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50 transition-colors duration-100"
                  >
                    <td className="px-6 py-3.5 font-semibold text-gray-800">
                      {tx.namaAset}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          tx.jenis === "Beli"
                            ? "bg-blue-50 text-blue-500"
                            : "bg-orange-50 text-orange-500"
                        }`}
                      >
                        {tx.jenis}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{tx.tanggal}</td>
                    <td className="px-4 py-3.5 text-gray-600">{tx.hargaPerUnit}</td>
                    <td className="px-4 py-3.5 text-gray-600">{tx.jumlah}</td>
                    <td className="px-4 py-3.5 text-gray-600">{tx.totalNilai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Jual */}
      {selectedAsset && (
        <KonfirmasiJualModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onConfirm={handleConfirmJual}
        />
      )}
      {successAsset && (
  <SuksesModal
    asset={successAsset}
    onClose={() => setSuccessAsset(null)}
  />
)}
    </div>
  );
}