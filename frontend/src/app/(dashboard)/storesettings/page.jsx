"use client";
import { Store, Phone, Mail, MapPin, Share2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function StoreSettingsPage() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    mapLink: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    website: "",
  });

const handleSave = async () => {
  setSaving(true);

  const token = localStorage.getItem("token");

  await fetch("http://localhost:5000/api/store/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: form.name,
      description: form.description,
      phone: form.phone,
      email: form.email,
      address: form.address,
      mapLink: form.mapLink,
      socials: {
        instagram: form.instagram,
        facebook: form.facebook,
        whatsapp: form.whatsapp,
        website: form.website,
      },
    }),
  });

  setSaving(false);
};

  const router = useRouter();
  //  Fetch store
  const fetchStore = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/store/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setStore(data);

    setForm({
      name: data.name || "",
      description: data.description || "",
      phone: data.phone || "",
      email: data.email || "",
      address: data.address || "",
      mapLink: data.mapLink || "",
      instagram: data.socials?.instagram || "",
      facebook: data.socials?.facebook || "",
      whatsapp: data.socials?.whatsapp || "",
      website: data.socials?.website || "",
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchStore();
  }, []);

  //  Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Save settings
 

  if (loading) return <p className="p-8">Loading...</p>;

return (
  <div className="max-w-4xl mx-auto">

    <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
        <p className="text-xs text-slate-500">Home / Settings</p>

        <h1 className="text-2xl md:text-3xl font-semibold mt-1">
          Store Settings
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Manage your store information and contact details
        </p>
      </div>

    <div className="space-y-8">

      {/* STORE INFO */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Store size={18} />
          <h2 className="text-lg font-semibold">Store Information</h2>
        </div>

        <div className="grid gap-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Store Name"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-brand-primary"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Description"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      </div>

      {/* CONTACT */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Phone size={18} />
          <h2 className="text-lg font-semibold">Contact Details</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-brand-primary"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-brand-primary"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-brand-primary md:col-span-2"
          />

          <input
            name="mapLink"
            value={form.mapLink}
            onChange={handleChange}
            placeholder="Google Maps Link"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-brand-primary md:col-span-2"
          />
        </div>
      </div>

      {/* SOCIAL */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Share2 size={18} />
          <h2 className="text-lg font-semibold">Social Links</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram URL" className="border px-3 py-2 rounded-lg" />
          <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook URL" className="border px-3 py-2 rounded-lg" />
          <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="border px-3 py-2 rounded-lg" />
          <input name="website" value={form.website} onChange={handleChange} placeholder="Website URL" className="border px-3 py-2 rounded-lg" />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  </div>
);
}
