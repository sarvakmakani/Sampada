import {
  Store,
  MessageCircle,
  Instagram,
  Facebook,
  ShoppingCart,
  MapPin,
} from "lucide-react";
import OrderButton from "@/app/components/OrderButton";
import ProductList from "@/app/components/ProductList";
// get store
async function getStore(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/store/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Store not found");
  }

  return res.json();
}

// get product
async function getProducts(storeId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/store/${storeId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}

// whatsapp
function getWhatsAppLink({ store, product }) {
  const phone = store.socials?.whatsapp;
  if (!phone) return "#";

  const storeUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://localhost:3000/store/${store.slug}`;

  const message = `
Hi ${store.name} 
I’m interested in this product:

Product: ${product.name}
Price: Rs. ${product.price}

Store link: ${storeUrl}
  `;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

//
export default async function StorePage({ params }) {
  const { slug } = await params;

  const storeRes = await getStore(slug);
  const store = storeRes.store || storeRes;
  const products = await getProducts(store._id);

  return (
    <div className="min-h-screen bg-slate-100 ">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* LEFT — STORE INFO */}
          <div className="flex items-center gap-4">
            {/* STORE AVATAR */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white flex items-center justify-center font-bold text-sm shadow">
              {store.name.slice(0, 2).toUpperCase()}
            </div>

            {/* STORE NAME */}
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Store
              </p>
              <p className="font-semibold text-slate-900 leading-none">
                {store.name}
              </p>
            </div>
          </div>

          {/* RIGHT — SOCIAL ICONS */}
          {/* RIGHT — ACTIONS */}
          <div className="flex items-center gap-3">
            {store.socials?.whatsapp && (
              <a
                href={`https://wa.me/${store.socials.whatsapp}`}
                target="_blank"
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition shadow"
              >
                <MessageCircle size={16} />
                Chat
              </a>
            )}

            <div className="flex gap-2">
              {store.socials?.instagram && (
                <a
                  href={store.socials.instagram}
                  target="_blank"
                  className="p-2 rounded-lg border hover:bg-slate-50"
                >
                  <Instagram size={18} />
                </a>
              )}

              {store.socials?.facebook && (
                <a
                  href={store.socials.facebook}
                  target="_blank"
                  className="p-2 rounded-lg border hover:bg-slate-50"
                >
                  <Facebook size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      {/* HERO */}
<div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#0F172A] text-white">

  <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">

    <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center md:gap-8">

      {/* AVATAR */}
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#2E78B7] to-[#2FA4C4] flex items-center justify-center text-2xl font-bold shadow mb-4 md:mb-0">
        {store.name[0].toUpperCase()}
      </div>

      {/* INFO */}
      <div className="w-full">

        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          {store.name}
        </h1>

        <p className="text-slate-300 mt-2 text-sm md:text-base max-w-md mx-auto md:mx-0">
          {store.description}
        </p>

        {store.address && (
          <p className="text-slate-400 text-sm mt-1">
             {store.address}
          </p>
        )}

        {/* SOCIAL BUTTONS */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">

          {store.socials?.whatsapp && (
            <a
              href={`https://wa.me/${store.socials.whatsapp}`}
              target="_blank"
              className="flex items-center gap-2 bg-green-600 px-5 py-3 rounded-full text-sm font-medium hover:bg-green-700 transition min-h-[44px]"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          )}

          {store.socials?.instagram && (
            <a
              href={store.socials.instagram}
              target="_blank"
              className="flex items-center gap-2 border border-white/30 px-5 py-3 rounded-full text-sm hover:bg-white hover:text-black transition min-h-[44px]"
            >
              <Instagram size={16} />
              Instagram
            </a>
          )}

          {store.socials?.facebook && (
            <a
              href={store.socials.facebook}
              target="_blank"
              className="flex items-center gap-2 border border-white/30 px-5 py-3 rounded-full text-sm hover:bg-white hover:text-black transition min-h-[44px]"
            >
              <Facebook size={16} />
              Facebook
            </a>
          )}

          {store.mapLink && (
            <a
              href={store.mapLink}
              target="_blank"
              className="flex items-center gap-2 border border-white/30 px-5 py-3 rounded-full text-sm hover:bg-white hover:text-black transition min-h-[44px]"
            >
              <MapPin size={16} />
              Location
            </a>
          )}

        </div>

        <div className="mt-5 text-xs text-slate-400">
          Powered by{" "}
          <a href="https://sampada-app.vercel.app/" className="text-[#2FA4C4] font-medium">Sampada</a>
        </div>

      </div>
    </div>
  </div>
</div>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-center ">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Our Products</h2>

            <p className="text-slate-500 mt-1">
              Browse and order directly on WhatsApp
            </p>
          </div>
        </div>
        <ProductList
          products={products}
          store={store}
          // getWhatsAppLink={getWhatsAppLink}
        />
      </div>
      {/* SAMPADA CTA */}
      <div className="mt-24 bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-16 text-center">
        <h3 className="text-3xl font-bold">Start selling online in minutes</h3>

        <p className="mt-3 max-w-xl mx-auto text-white/80">
          Create your free Sampada store and receive orders directly on
          WhatsApp.
        </p>

        <a
          href="/register"
          className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          Create Free Store
        </a>
      </div>
      {/* FOOTER */}
      <footer className="border-t bg-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between text-sm text-slate-500">
          <span>
            © {new Date().getFullYear()} {store.name}
          </span>
          <span>
            Powered by{" "}
            <b className="font-semibold text-brand-primary">Sampada</b>
          </span>
        </div>
      </footer>
    </div>
  );
}
