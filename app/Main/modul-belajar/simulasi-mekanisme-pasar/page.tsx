"use client";

import { Inter } from "next/font/google";
import { useState, useMemo } from "react";
import SideNavbar from "@/app/components/layout/sideNavbar";

const inter = Inter({ subsets: ["latin"] });

function formatRupiah(num: number) {
  return "Rp" + Math.abs(num).toLocaleString("id-ID");
}

export default function SimulasiMekanismePasarPage() {
  const [demand, setDemand] = useState<number>(50);
  const [supply, setSupply] = useState<number>(50);

  // Initial setup for the simulation
  const INITIAL_PRICE = 5000;
  const UNIT_BOUGHT = 100;
  const TOTAL_MODAL = INITIAL_PRICE * UNIT_BOUGHT;

  // Calculate dynamic price based on Supply and Demand
  // Simple formula: price changes up to 50% based on the ratio of demand to supply
  const currentPrice = useMemo(() => {
    // Diff ranges from -100 to 100
    const diff = demand - supply;
    // Max movement is 50% of the initial price up or down
    // If diff is 100 (Max demand, 0 supply), price goes up by 50%
    // If diff is -100 (Max supply, 0 demand), price goes down by 50%
    const percentageChange = diff / 2; // -50 to 50
    const changeAmount = INITIAL_PRICE * (percentageChange / 100);
    return INITIAL_PRICE + changeAmount;
  }, [demand, supply]);

  const currentTotalValue = currentPrice * UNIT_BOUGHT;
  const gainLossNum = currentTotalValue - TOTAL_MODAL;
  const gainLossPercent = ((gainLossNum / TOTAL_MODAL) * 100).toFixed(2);
  const isPositive = gainLossNum >= 0;

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideNavbar />

      <div className="flex-1 bg-[#F7F8FA] min-h-screen p-8 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
          <span>Modul Belajar</span>
          <span>›</span>
          <span className="text-gray-700 font-medium">Simulasi Mekanisme Pasar</span>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mekanisme Harga & Portofolio
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-4xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Teori Dasar</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Harga saham naik dan turun terutama didasarkan pada mekanisme penawaran (supply) dan permintaan (demand) di pasar modal. Saat pembeli lebih banyak dari penjual, harga naik; sebaliknya, harga turun. Faktor utama penggeraknya meliputi kinerja fundamental perusahaan, kondisi ekonomi makro (inflasi, suku bunga), aksi korporasi, serta sentimen atau psikologi pasar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
          {/* Market Simulation Control Panel */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Pasar Bursa Simulasi</h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">Live Interactive</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Permintaan (Demand) / Pembeli</label>
                <span className="text-sm font-bold text-blue-600">{demand}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={demand} 
                onChange={(e) => setDemand(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-xs text-gray-400 mt-1">Mengukur seberapa besar minat beli di pasar.</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Penawaran (Supply) / Penjual</label>
                <span className="text-sm font-bold text-red-500">{supply}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={supply} 
                onChange={(e) => setSupply(Number(e.target.value))}
                className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <p className="text-xs text-gray-400 mt-1">Mengukur jumlah saham yang ingin dijual investor.</p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Harga Saham Terbentuk:</p>
                <p className={`text-2xl font-bold transition-colors ${
                  demand > supply ? 'text-green-500' : demand < supply ? 'text-red-500' : 'text-gray-900'
                }`}>
                  {formatRupiah(currentPrice)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Kondisi Pasar</p>
                <div className={`px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm transition-colors ${
                    demand > supply ? 'bg-green-500' : demand < supply ? 'bg-red-500' : 'bg-gray-400'
                  }`}>
                    {demand > supply ? "Trending Naik 📈" : demand < supply ? "Trending Turun 📉" : "Sedang Sideways ➖"}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Impact Panel */}
          <div className="bg-[#1A202C] text-white rounded-2xl shadow-lg p-6 flex flex-col relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
            
            <h3 className="text-lg font-bold mb-1">Dampak Portofolio (Gain/Loss)</h3>
            <p className="text-sm text-gray-400 mb-6">Melihat efek perubahan harga pada asetmu.</p>

            <div className="space-y-4 mb-6 relative z-10">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-sm text-gray-300">Unit Dimiliki</span>
                <span className="font-semibold">{UNIT_BOUGHT} Unit</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-sm text-gray-300">Harga Beli Awal</span>
                <span className="font-semibold">{formatRupiah(INITIAL_PRICE)}</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-sm text-gray-300">Total Modal Awal</span>
                <span className="font-semibold">{formatRupiah(TOTAL_MODAL)}</span>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
              <div className="flex justify-between mb-4">
                <span className="text-sm text-gray-300">Nilai Aset Saat Ini</span>
                <span className="text-lg font-bold text-white">{formatRupiah(currentTotalValue)}</span>
              </div>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-gray-400 mb-2">Total Keuntungan / Kerugian (Gain/Loss)</p>
                <div className="flex items-end gap-3">
                  <p className={`text-3xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? "+" : "-"}{formatRupiah(gainLossNum)}
                  </p>
                  <p className={`text-base font-semibold mb-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    ({isPositive ? "+" : ""}{gainLossPercent}%)
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
