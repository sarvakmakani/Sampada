"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Store, ArrowRight } from "lucide-react";

export default function CreateStorePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Prevent access without login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          socials: {
            whatsapp,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert(data.message || "Failed to create store");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl border">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-brand-primary text-white rounded-xl flex items-center justify-center mb-4">
            <Store size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Create Your Store
          </h1>

          <p className="text-slate-500 mt-2">
            Let's set up your online shop in under a minute.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleCreate} className="space-y-5">

          {/* STORE NAME */}
          <div>
            <label className="text-sm text-slate-600 font-medium">
              Store Name
            </label>
            <input
              required
              placeholder="Ex: Mahadev Clothes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-slate-600 font-medium">
              Description
            </label>
            <textarea
              placeholder="What do you sell?"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 border px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
            />
          </div>

          {/* WHATSAPP */}
          <div>
            <label className="text-sm text-slate-600 font-medium">
              WhatsApp Number
            </label>
            <input
              required
              placeholder="919876543210"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full mt-1 border px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
            />
            <p className="text-xs text-slate-400 mt-1">
              Include country code without +
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-brand-secondary transition"
          >
            {loading ? "Creating..." : "Create Store"}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}