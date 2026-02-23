import {
  Store,
  Smartphone,
  MessageCircle,
  Share2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import logo from "../public/logoref3.png";
import logonext from "../public/logoref1.png";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-28 h-28 bg-white bg-opacity-85 rounded-xl shadow flex items-center justify-center mx-auto mb-6 p-3">
            <div className="w-24 h-24 relative  ">
              <Image
                src={logo}
                alt="Sampada Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            A digital identity for every small seller.
          </h1>

          <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto">
            Sampada helps local sellers, home businesses, and small shops create
            their own online store in minutes without technical complexity.
          </p>

          <a
            href="/register"
            className="inline-flex items-center gap-2 mt-10 bg-white text-brand-primary px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition"
          >
            Create Your Store Free
            <ArrowRight />
          </a>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Selling online today is frustrating for small sellers.
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Many sellers rely on Instagram chats, WhatsApp messages, and
            scattered product photos. Managing orders, sharing catalogs, and
            tracking customers becomes messy and time-consuming.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-12 text-left">
            <div>
              <Smartphone className="text-brand-primary mb-4" size={28} />
              <h3 className="font-semibold text-lg">Scattered catalogs</h3>
              <p className="text-slate-500 mt-2">
                Product photos are lost across chats and social media.
              </p>
            </div>

            <div>
              <MessageCircle className="text-brand-primary mb-4" size={28} />
              <h3 className="font-semibold text-lg">Manual order handling</h3>
              <p className="text-slate-500 mt-2">
                Sellers struggle to manage inquiries and track orders.
              </p>
            </div>

            <div>
              <Share2 className="text-brand-primary mb-4" size={28} />
              <h3 className="font-semibold text-lg">No online presence</h3>
              <p className="text-slate-500 mt-2">
                Many small businesses lack a professional storefront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Sampada solves this with simplicity.
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Instead of building a complicated marketplace, Sampada gives each
            seller their own digital storefront simple, powerful, and easy to
            share.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
            {[
              "Create your store in minutes",
              "Share one simple link with customers",
              "Show products professionally",
              "Receive orders directly on WhatsApp",
              "No commissions or marketplace fees",
              "Full control over your customers",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="text-green-500" />
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Built for everyday entrepreneurs.
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Sampada is designed for real sellers who want to go digital without
            complexity.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              "Instagram sellers",
              "Home-based businesses",
              "Small retail shops",
              "Street vendors",
              "Local artisans",
              "Micro entrepreneurs",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 font-medium"
              >
                {item}
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
          Create your online store, share your products, and grow your business
          — all in minutes.
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
