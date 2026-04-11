"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { useState } from "react";
import LogoutConfirm from "../logout/logoutconfirm";
import { createClient } from "@/utils/supabase/client";

const inter = Inter({ subsets: ["latin"] });

const navItems = [
  {
    label: "Dashboard",
    href: "/Main/dashboard",
    icon: "/icons/sideNavbar/dashboard.png",
  },
  {
    label: "Simulasi Investasi",
    href: "/Main/simulasi-investasi",
    icon: "/icons/sideNavbar/simulasiInvest.png",
  },
  {
    label: "Modul Belajar",
    href: "/Main/modul-belajar",
    icon: "/icons/sideNavbar/modul.png",
  },
  {
    label: "Akun",
    href: "/Main/akun",
    icon: "/icons/sideNavbar/akun.png",
  },
];

export default function SideNavbar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowLogout(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {/* ─── MOBILE TOP NAVBAR ─────────────────────────────────────────── */}
      <div id="navbar-mobile" className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">
            InvestPlan
          </h1>
          <button
          id="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            {mobileOpen ? (
              // X icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1 shadow-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={isActive ? { backgroundColor: "#D1DBFA" } : {}}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? "text-[#3B5BDB]"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={18}
                    height={18}
                    className="object-contain shrink-0"
                    style={
                      isActive
                        ? {
                            filter:
                              "invert(27%) sepia(89%) saturate(1200%) hue-rotate(210deg) brightness(90%)",
                          }
                        : { opacity: 0.6 }
                    }
                  />
                  <span className={isActive ? "font-semibold" : ""}>
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Logout */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setShowLogout(true);
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <Image
                  src="/icons/sideNavbar/logout.png"
                  alt="Logout"
                  width={18}
                  height={18}
                  className="object-contain opacity-70 shrink-0"
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spacer untuk mobile agar konten tidak tertutup navbar */}
      <div className="md:hidden h-[57px] shrink-0" />

      {/* ─── DESKTOP SIDE NAVBAR ───────────────────────────────────────── */}
      <aside
        id="navbar-desktop" className={`${inter.className} hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex-col py-6 z-40 transition-all duration-300 ease-in-out
          ${collapsed ? "w-[68px] px-3" : "w-[220px] px-4"}`}
      >
        {/* Logo + Collapse Button */}
        <div className={`mb-5 flex items-center justify-between ${collapsed ? "px-1" : "px-2"}`}>
          {!collapsed ? (
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                InvestPlan
              </h1>
              <div className="mt-1 h-[1px] w-32 bg-gray-400 rounded-full" />
            </div>
          ) : (
            <div />
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-1 w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
            title={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-gray-500 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={isActive ? { backgroundColor: "#D1DBFA" } : {}}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150
                  ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}
                  ${
                    isActive
                      ? "text-[#3B5BDB]"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  height={18}
                  className="object-contain shrink-0"
                  style={
                    isActive
                      ? {
                          filter:
                            "invert(27%) sepia(89%) saturate(1200%) hue-rotate(210deg) brightness(90%)",
                        }
                      : { opacity: 0.6 }
                  }
                />
                {!collapsed && (
                  <span className={isActive ? "font-semibold" : ""}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <button
            onClick={() => setShowLogout(true)}
            title={collapsed ? "Logout" : undefined}
            className={`flex items-center gap-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-150
              ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}`}
          >
            <Image
              src="/icons/sideNavbar/logout.png"
              alt="Logout"
              width={18}
              height={18}
              className="object-contain opacity-70 shrink-0"
            />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Desktop Spacer */}
      <div
        className={`hidden md:block shrink-0 transition-all duration-300 ease-in-out ${
          collapsed ? "w-[68px]" : "w-[220px]"
        }`}
      />

      {/* Logout Modal */}
      <LogoutConfirm
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}