"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  LucideArrowDownRightFromSquare,
} from "lucide-react";
import logo from "../public/logoref1.png";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [store, setStore] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchStore = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setStore(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStore();
  }, [router]);

  const isActive = (path) =>
    pathname.startsWith(path)
      ? "bg-brand-primary text-white"
      : "text-slate-400 hover:bg-slate-800";

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col">
        {/* LOGO */}
        <div className="p-6 font-bold text-slate-100 text-2xl flex items-center gap-3 border-b border-slate-800">
          <Image className="w-16 h-16" src={logo} alt="S" />
          Sampada
        </div>

        {/* NAVIGATION */}
        <nav className="px-4 mt-6 space-y-2 flex-1">
          <div
            onClick={() => router.push("/dashboard")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${isActive("/dashboard")}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </div>

          <div
            onClick={() => router.push("/products")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${isActive("/products")}`}
          >
            <Package size={18} />
            Products
          </div>

          <div
            onClick={() => router.push("/storesettings")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${isActive("/storesettings")}`}
          >
            <Settings size={18} />
            Store Settings
          </div>
        </nav>

        {/* SELLER PROFILE + LOGOUT */}
        <div className="border-t border-slate-800 p-4">
          {/* PROFILE */}
          {store && (
            <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-slate-800 transition">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-semibold">
                {store.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-medium text-white">{store.name}</p>
                <p className="text-xs text-slate-400">Seller</p>
              </div>
            </div>
          )}

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
