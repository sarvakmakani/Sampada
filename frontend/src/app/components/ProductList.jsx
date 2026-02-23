"use client";

import { useState } from "react";
import OrderButton from "./OrderButton";
import { Search,Package } from "lucide-react";
export default function ProductList({ products, store }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  function getWhatsAppLink(product) {
    const phone = store.socials?.whatsapp;
    if (!phone) return "#";

    const storeUrl = `${window.location.origin}/store/${store.slug}`;

    const message = `
Hi ${store.name}
I’m interested in this product:

Product: ${product.name}
Price: Rs. ${product.price}

Store link: ${storeUrl}
    `;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  const categories = [
    "All",
    ...new Set(products.map((p) => (p.category || "General").trim())),
  ];
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (p.category || "General") === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* CATEGORY FILTER */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selectedCategory === cat
                ? "bg-brand-primary text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mb-8 flex justify-between items-center gap-4 flex-wrap">
        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary outline-none bg-whiteshadow-sm focus:shadow-md"
          />
        </div>

        <p className="text-sm text-slate-500">{filtered.length} results</p>
      </div>
      {filtered.length === 0 && (
        <div className="bg-white border rounded-xl p-12 text-center">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="font-semibold text-lg text-slate-800">
            No products found
          </h3>
          <p className="text-slate-500 mt-2">
            Try changing category or search.
          </p>
        </div>
      )}
      {/* PRODUCTS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="relative h-56 bg-slate-100 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  No image
                </div>
              )}

              {/* CATEGORY BADGE */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium rounded-full text-brand-primary shadow">
                {product.category || "General"}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col justify-between min-h-[170px]">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                  {product.description || "No description available"}
                </p>
              </div>

              {/* PRICE + CTA */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-bold text-brand-primary">
                  ₹{product.price}
                </span>

                <OrderButton
                  storeId={store._id}
                  link={getWhatsAppLink(product)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
