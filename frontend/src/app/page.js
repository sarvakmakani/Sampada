import {
  Smartphone,
  MessageCircle,
  Share2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import logo from "./public/logoref3.png";
import logonext from "./public/logoref1.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAVBAR */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

          <Image
            src={logo}
            alt="Sampada"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />

          <div className="flex items-center gap-2 md:gap-3 text-sm">
            <a
              href="/about"
              className="px-3 md:px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-brand-primary transition"
            >
              About
            </a>

            <a
              href="/login"
              className="hidden sm:inline-block px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Login
            </a>

            <a
              href="/register"
              className="bg-brand-primary text-white px-4 md:px-5 py-2 rounded-lg font-medium hover:bg-brand-secondary transition shadow-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary text-white py-16 md:py-24 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Create your own online store in minutes.
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-xl text-white/90">
            Sampada helps small sellers showcase products, share catalogs,
            and receive orders directly on WhatsApp — without technical complexity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-10">
            <a
              href="/register"
              className="flex items-center justify-center gap-2 bg-white text-brand-primary px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition"
            >
              Create Your Store
              <ArrowRight />
            </a>

            <a
              href="/about"
              className="px-6 md:px-8 py-3 md:py-4 border border-white rounded-xl hover:bg-white hover:text-brand-primary transition"
            >
              About Us
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-brand-primary/60 to-slate-50">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Selling online shouldn't be complicated.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-14">
            {[
              {
                icon: Smartphone,
                title: "Messy product sharing",
                desc: "Sellers send photos individually across chats.",
              },
              {
                icon: MessageCircle,
                title: "Manual order handling",
                desc: "Tracking customers becomes chaotic.",
              },
              {
                icon: Share2,
                title: "No online identity",
                desc: "Many sellers lack a professional storefront.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm hover:shadow-lg transition"
              >
                <item.icon
                  size={28}
                  className="text-brand-primary mx-auto mb-4"
                />

                <h3 className="font-semibold text-lg text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-500 mt-3 text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Everything a small seller needs.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-10 md:mt-16">
            {[
              "Create a personal store link",
              "Show products professionally",
              "Receive orders via WhatsApp",
              "Manage product visibility",
              "Share store with QR or social media",
              "No marketplace commissions",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-xl p-5 md:p-6 border shadow-sm"
              >
                <CheckCircle className="text-green-500 shrink-0" />
                <p className="text-slate-700 font-medium text-sm md:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-brand-primary/60">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Get started in 3 simple steps.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-10 md:mt-16">
            {[
              "Create your store",
              "Add your products",
              "Share and start selling",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white p-8 md:p-10 rounded-2xl border shadow-sm"
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-primary">
                  {i + 1}
                </div>
                <p className="mt-4 font-medium text-slate-800">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-dark text-white py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold">
          Start your digital journey today.
        </h2>

        <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80">
          Join thousands of small sellers going online with Sampada.
        </p>

        <a
          href="/register"
          className="inline-flex items-center gap-2 mt-8 md:mt-10 bg-brand-secondary px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Create Your Store Free
          <ArrowRight size={18} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-100 text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          <div>
            <Image
              src={logonext}
              alt="Sampada"
              className="w-14 h-14 object-contain"
            />
            <p className="text-slate-500 mt-4 text-sm leading-relaxed">
              Helping small sellers create their digital identity,
              showcase products, and receive orders easily through WhatsApp.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <a href="/about">About Sampada</a>
              <a href="/login">Login</a>
              <a href="/register">Create Store</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Ready to start selling?
            </h3>

            <p className="text-sm text-slate-500 mb-4">
              Create your online store in minutes.
            </p>

            <a
              href="/register"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-brand-secondary transition"
            >
              Get Started Free
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="border-t text-center text-sm text-slate-500 py-4">
          © {new Date().getFullYear()} Sampada. All rights reserved.
        </div>
      </footer>

    </div>
  );
}