"use client";

import { ShoppingCart } from "lucide-react";

export default function OrderButton({ storeId, link }) {
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store/track-click`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId }),
      });
    } catch (err) {
      console.error("Tracking failed");
    }

    window.open(link, "_blank");
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-brand-secondary hover:shadow-lg"
    >
      <ShoppingCart size={16} />
      Order via WhatsApp
    </a>
  );
}