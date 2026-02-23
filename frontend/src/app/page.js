import {
  Store,
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
      <nav className="bg-slate-100 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* <div className="flex items-center gap-2 text-xl font-semibold">
            <div className="w-8 h-8 bg-brand-primary text-white rounded flex items-center justify-center">
              <Store size={18} />
            </div>
            Sampada
          </div> */}
          <div className=" font-bold text-brand-primary text-2xl flex items-center gap-3 ">
            <Image
              src={logo}
              alt="Sampada"
              className="w-16 h-16 object-contain"
            />{" "}
          </div>

          <div className="flex items-center gap-3 text-sm">
            {/* ABOUT */}
            <a
              href="/about"
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-brand-primary transition"
            >
              About
            </a>

            {/* LOGIN */}
            <a
              href="/login"
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-brand-primary transition"
            >
              Login
            </a>

            {/* PRIMARY CTA */}
            <a
              href="/register"
              className="bg-brand-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-secondary transition shadow-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold leading-tight">
            Create your own online store in minutes.
          </h1>

          <p className="mt-6 text-xl text-white/90">
            Sampada helps small sellers showcase products, share catalogs, and
            receive orders directly on WhatsApp — without technical complexity.
          </p>

          <div className="flex justify-center gap-4 mt-10">
            <a
              href="/register"
className="flex items-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition"            >
              Create Your Store
              <ArrowRight />
            </a>

            <a
              href="/about"
              className="px-8 py-4 border border-white rounded-xl hover:bg-white hover:text-brand-primary transition"
            >
              About Us
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6 bg-gradient-to-b from-brand-primary/60 to-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Selling online shouldn't be complicated.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
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
                className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition"
              >
                <item.icon
                  size={32}
                  className="text-brand-primary mx-auto mb-4"
                />

                <h3 className="font-semibold text-lg text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-500 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Everything a small seller needs.
          </h2>

          <div className="grid md:grid-cols-2 gap-10 mt-16">
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
                className="flex items-center gap-4 bg-slate-50 rounded-xl p-6 border"
              >
                <CheckCircle className="text-green-500" />
                <p className="text-slate-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-brand-primary/60">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Get started in 3 simple steps.
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">
            {[
              "Create your store",
              "Add your products",
              "Share and start selling",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-2xl border shadow-sm"
              >
                <div className="text-5xl font-bold text-brand-primary">
                  {i + 1}
                </div>
                <p className="mt-4 font-medium text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-dark text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold">
          Start your digital journey today.
        </h2>

        <p className="mt-6 text-lg text-white/80">
          Join thousands of small sellers going online with Sampada.
        </p>

        <a
          href="/register"
          className="inline-flex items-center gap-2 mt-10 bg-brand-secondary px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition"
        >
          Create Your Store Free
          <ArrowRight />
        </a>
      </section>

      <footer className="bg-slate-100 text-brand-dark ">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Image
              src={logonext}
              alt="Sampada"
              className="w-16 h-16 object-contain"
            />{" "}
            </div>

            <p className="text-slate-500 mt-4 text-sm leading-relaxed">
              Helping small sellers create their digital identity, showcase
              products, and receive orders easily through WhatsApp.
            </p>
          </div>

          {/* NAV LINKS */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>

            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <a href="/about" className="hover:text-brand-primary">
                About Sampada
              </a>
              <a href="/login" className="hover:text-brand-primary">
                Login
              </a>
              <a href="/register" className="hover:text-brand-primary">
                Create Store
              </a>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Ready to start selling?
            </h3>

            <p className="text-sm text-slate-500 mb-4">
              Create your online store in minutes and grow your business.
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

        {/* BOTTOM BAR */}
        <div className="border-t bg-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-2">
            <span>
              © {new Date().getFullYear()} Sampada. All rights reserved.
            </span>

            <span>Built for small sellers of India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
