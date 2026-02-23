"use client";

import QRCode from "react-qr-code";
import { Download } from "lucide-react";

export default function StoreQRCode({ url }) {
  const downloadQR = () => {
    const svg = document.getElementById("store-qr");
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "sampada-store-qr.png";
      link.href = pngFile;
      link.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="bg-white border rounded-xl p-6 m-3 text-center">
      <h3 className="font-semibold text-slate-900 mb-4">Share Your Store</h3>

      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg border">
          <QRCode id="store-qr" value={url} size={180} />
        </div>
      </div>

      <button
        onClick={downloadQR}
        className="mt-6 flex items-center gap-2 mx-auto bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary transition"
      >
        <Download size={16} />
        Download QR
      </button>
    </div>
  );
}
