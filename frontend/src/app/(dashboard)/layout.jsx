"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logo from "../public/logoref1.png";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [store, setStore] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const fetchStore = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/store/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) setStore(await res.json());
    };

    fetchStore();
  }, [router]);

  const isActive = (path) =>
    pathname.startsWith(path)
      ? "bg-brand-primary text-white"
      : "text-slate-400 hover:bg-slate-800";

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 bg-brand-dark text-white flex-col">

        {/* LOGO */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Image className="w-12 h-12" src={logo} alt="S" />
          <span className="text-xl font-bold">Sampada</span>
        </div>

        {/* NAV */}
        <nav className="px-4 mt-6 space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" path="/dashboard" router={router} isActive={isActive} />
          <NavItem icon={<Package size={18} />} label="Products" path="/products" router={router} isActive={isActive} />
          <NavItem icon={<Settings size={18} />} label="Settings" path="/storesettings" router={router} isActive={isActive} />
        </nav>

        {/* PROFILE + LOGOUT */}
        <div className="border-t border-slate-800 p-4">

          {store && (
            <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-slate-800 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-semibold">
                {store.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-medium text-white">{store.name}</p>
                <p className="text-xs text-slate-400">Seller</p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <LogOut size={18} />
            Log out
          </button>

        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE HEADER */}
        <div className="md:hidden bg-white border-b px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" className="w-8 h-8" />
            <span className="font-semibold">Sampada</span>
          </div>

          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-10 pb-20 md:pb-10">
          {children}
        </main>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50">

          <div className="bg-white w-72 h-full p-6 shadow-lg">

            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Account</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {store && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
                  {store.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{store.name}</p>
                  <p className="text-sm text-slate-500">Seller</p>
                </div>
              </div>
            )}

            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 border rounded-lg hover:bg-slate-50"
            >
              <LogOut size={18} />
              Log out
            </button>

          </div>
        </div>
      )}

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden flex justify-around py-3 z-40">
        <MobileTab icon={<LayoutDashboard />} label="Home" path="/dashboard" router={router} isActive={pathname} />
        <MobileTab icon={<Package />} label="Products" path="/products" router={router} isActive={pathname} />
        <MobileTab icon={<Settings />} label="Settings" path="/storesettings" router={router} isActive={pathname} />
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({ icon, label, path, router, isActive }) {
  return (
    <div
      onClick={() => router.push(path)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${isActive(path)}`}
    >
      {icon}
      {label}
    </div>
  );
}

function MobileTab({ icon, label, path, router, isActive }) {
  return (
    <button
      onClick={() => router.push(path)}
      className={`flex flex-col items-center text-xs ${
        isActive.startsWith(path) ? "text-brand-primary" : "text-slate-400"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}