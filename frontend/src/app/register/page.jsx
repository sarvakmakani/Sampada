"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Lock } from "lucide-react";
import logo from "../public/logoref1.png";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      }
    );

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // Save JWT
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      alert(data.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3 text-2xl font-semibold">
          <div className="flex font-bold text-slate-100 text-2xl items-center gap-3">
            <Image className="w-16 h-16" src={logo} alt="S" />
            Sampada
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Start selling online in minutes.
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-md">
            Create your own digital store, share product catalogs, and receive
            orders directly on WhatsApp.
          </p>
        </div>

        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} Sampada
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center bg-slate-100 px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
          {/* HEADER */}
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Create account
          </h1>
          <p className="text-slate-500 mb-6">
            Start your digital store journey
          </p>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white py-3 rounded-lg font-medium hover:bg-brand-secondary transition"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-slate-500 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-brand-primary font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}