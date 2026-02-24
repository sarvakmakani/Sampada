import {
  Smartphone,
  MessageCircle,
  Share2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import logo from "../public/logoref3.png";
import logonext from "../public/logoref1.png";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* TOP NAV */}
<div className=" backdrop-blur border-b">
  <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center">
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-primary transition"
    >
      <ArrowLeft size={18} />
      Back to Home
    </Link>
  </div>
</div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary text-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-white/90 rounded-xl shadow flex items-center justify-center mx-auto mb-6 p-3">
            <div className="w-16 h-16 md:w-24 md:h-24 relative">
              <Image
                src={logo}
                alt="Sampada Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            A digital identity for every small seller.
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-xl text-white/90 max-w-3xl mx-auto">
            Sampada helps local sellers, home businesses, and small shops create
            their own online store in minutes without technical complexity.
          </p>

          <a
            href="/register"
            className="inline-flex items-center gap-2 mt-8 md:mt-10 bg-white text-brand-primary px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Create Your Store Free
            <ArrowRight />
          </a>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Selling online today is frustrating for small sellers.
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-600">
            Many sellers rely on Instagram chats, WhatsApp messages, and
            scattered product photos. Managing orders becomes messy and
            time-consuming.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-left">
            <Problem
              icon={<Smartphone />}
              title="Scattered catalogs"
              text="Product photos are lost across chats."
            />
            <Problem
              icon={<MessageCircle />}
              title="Manual order handling"
              text="Hard to manage inquiries and track orders."
            />
            <Problem
              icon={<Share2 />}
              title="No online presence"
              text="Many sellers lack a professional storefront."
            />
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-white py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Sampada solves this with simplicity.
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-600">
            Each seller gets their own digital storefront — simple, powerful,
            and easy to share.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-left">
            {[
              "Create your store in minutes",
              "Share one simple link",
              "Show products professionally",
              "Receive orders via WhatsApp",
              "No commissions or fees",
              "Full customer control",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="text-green-500" />
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO FOR */}
      <section className="py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Built for everyday entrepreneurs.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {[
              "Instagram sellers",
              "Home businesses",
              "Retail shops",
              "Street vendors",
              "Local artisans",
              "Micro entrepreneurs",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-4 font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white py-16 md:py-20 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold">
          Start your digital journey today.
        </h2>

        <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80">
          Create your online store and grow your business in minutes.
        </p>

        <a
          href="/register"
          className="inline-flex items-center gap-2 mt-8 bg-brand-secondary px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Create Your Store Free
          <ArrowRight />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-100 text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src={logonext}
              alt="Sampada"
              className="w-16 h-16 object-contain"
            />
            <p className="text-slate-500 mt-4 text-sm">
              Helping small sellers create their digital identity and receive
              orders easily.
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
            <h3 className="font-semibold mb-4">Ready to start?</h3>
            <a
              href="/register"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-lg text-sm"
            >
              Get Started Free
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="border-t text-center text-sm text-slate-500 py-4">
          © {new Date().getFullYear()} Sampada — Built for small sellers of
          India
        </div>
      </footer>
    </div>
  );
}

/* reusable component */
function Problem({ icon, title, text }) {
  return (
    <div>
      <div className="text-brand-primary mb-3">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-slate-500 mt-1">{text}</p>
    </div>
  );
}
