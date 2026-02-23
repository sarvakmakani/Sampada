"use client";
import { BarChart3, MousePointerClick, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StoreQRCode from "@/app/StoreQRCode/page.jsx";
import useAuth from "@/app/hooks/useAuth";
import {
  PackagePlus,
  Eye,
  Copy,
  ExternalLink,
  Settings,
  Store,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [storeUrl, setStoreUrl] = useState("");
  useAuth();
  const completionItems = store
    ? [
        store.name,
        store.description,
        store.socials?.whatsapp,
        store.phone,
        store.email,
        store.address,
        store.socials?.instagram,
      ]
    : [];

  useEffect(() => {
    if (store?.slug) {
      setStoreUrl(`${window.location.origin}/store/${store.slug}`);
    }
  }, [store]);
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const total = completionItems.length;
  const completed = completionItems.filter(Boolean).length;

  const percent =
    completionItems.length > 0
      ? Math.round((completed / completionItems.length) * 100)
      : 0;
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const storeRes = await fetch(`${API}/api/store/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const storeData = await storeRes.json();

        if (!storeData || !storeData.name) {
          router.push("/createstore");
          return;
        }

        setStore(storeData);

        const productRes = await fetch(
          `${API}/api/products/dashboard/${storeData._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const productData = await productRes.json();
        setProducts(productData.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="flex-1 p-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-sm text-slate-500">Home / Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-900 mt-1">
              Overview
            </h1>
            <p className="text-slate-500">
              Welcome back — here's your store summary.
            </p>
          </div>

          {store && (
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/products")}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                <PackagePlus size={16} />
                Add Product
              </button>

              <button
                onClick={() => router.push(`/store/${store.slug}`)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary"
              >
                <Eye size={16} />
                View Store
              </button>
            </div>
          )}
        </div>

        {/* CONTENT */}
        {store ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* STORE CARD */}
            <div className="bg-white border rounded-xl p-6 lg:col-span-2">
              <h2 className="font-semibold text-lg mb-4">Your Store</h2>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-blue-100 text-brand-primary rounded-lg flex items-center justify-center font-bold text-xl">
                  {store?.name?.[0] || "S"}
                </div>

                <div>
                  <h3 className="font-semibold">{store?.name || ""}</h3>
                  <p className="text-sm text-slate-500">
                    {store?.description || "No description"}
                  </p>
                </div>
              </div>
              {/* STORE LINK */}
              <div className="mt-6 bg-slate-100 rounded-lg px-4 py-3 flex justify-between items-center">
                <p className="text-sm truncate">
                  {window.location.origin}/store/{store?.slug}
                </p>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/store/${store.slug}`,
                    )
                  }
                  className="flex items-center gap-2 text-sm border px-3 py-1 rounded hover:bg-white"
                >
                  <Copy size={14} />
                  Copy
                </button>
              </div>
              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => router.push(`/store/${store.slug}`)}
                  className="flex items-center gap-2 px-5 py-2 bg-brand-dark text-white rounded-lg"
                >
                  <ExternalLink size={16} />
                  Open Store
                </button>

                <button
                  onClick={() => router.push("/storesettings")}
                  className="flex items-center gap-2 px-5 py-2 border rounded-lg"
                >
                  <Settings size={16} />
                  Edit Store
                </button>
              </div>
              <StoreQRCode
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/store/${store.slug}`}
              />
            </div>
            {/* <div className="bg-white border rounded-xl p-6 mb-8"></div> */}
            {/* QUICK ACTIONS */}
            <div className="bg-white border rounded-xl p-6">
              <div className="flex justify-between items-center mb-4 p-2">
                <h2 className="font-semibold text-lg">Complete Your Store</h2>
                <span className="text-sm text-brand-primary font-medium">
                  {percent}% done
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                <div
                  className="bg-brand-primary h-2 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Missing fields */}
              {percent < 100 && (
                <button
                  onClick={() => router.push("/storesettings")}
                  className="text-sm text-brand-primary pb-2 font-medium"
                >
                  Complete Profile →
                </button>
              )}

              <div className="space-y-4">
                <h2 className="flex items-center gap-2 font-semibold text-lg mb-6">
                  <BarChart3 size={18} className="text-brand-primary" />
                  Store Analytics
                </h2>{" "}
                {/* STORE VIEWS */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border flex items-center gap-4 shadow-sm hover:scale-[1.02] transition">
                  <div className="w-12 h-12 bg-brand-primary text-white rounded-lg flex items-center justify-center">
                    <BarChart3 size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Store Views</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {store.views || 0}
                    </p>
                  </div>
                </div>
                {/* WHATSAPP CLICKS */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border flex items-center gap-4 shadow-sm hover:scale-[1.02] transition">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center">
                    <MousePointerClick size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">WhatsApp Clicks</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {store.whatsappClicks || 0}
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border flex items-center gap-4 shadow-sm hover:scale-[1.02] transition">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                    <Package size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Total Products</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {products?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="font-semibold text-lg mt-8 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => router.push("/products")}
                  className="flex items-center gap-3 w-full border rounded-lg p-3 hover:bg-slate-50"
                >
                  <PackagePlus size={18} />
                  Add a Product
                </button>

                <button
                  onClick={() => router.push("/storesettings")}
                  className="flex items-center gap-3 w-full border rounded-lg p-3 hover:bg-slate-50"
                >
                  <Settings size={18} />
                  Edit Store Info
                </button>

                {/* ANALYTICS SECTION */}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border rounded-xl p-12 text-center">
            <h3 className="text-xl font-semibold">No store yet</h3>

            <button
              onClick={() => router.push("/createstore")}
              className="flex items-center gap-2 mx-auto mt-6 px-6 py-2 bg-brand-secondary text-white rounded-lg"
            >
              <Store size={18} />
              Create Store
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
