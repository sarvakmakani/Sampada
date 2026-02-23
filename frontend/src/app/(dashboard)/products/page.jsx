"use client";
import {
  PackagePlus,
  Package,
  Eye,
  EyeOff,
  Trash2,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

  // FETCH DATA
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const storeRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/store/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const storeData = await storeRes.json();
      setStore(storeData);

      const productRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/dashboard/${storeData._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const productData = await productRes.json();
      setProducts(productData.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // IMAGE UPLOAD
  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.imageUrl;
  };

  // ADD PRODUCT
  const handleAddProduct = async () => {
    const token = localStorage.getItem("token");
    const imageUrl = await uploadImage();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        storeId: store._id,
        name,
        description,
        category,
        price,
        image: imageUrl,
      }),
    });

    // Reset
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setPreview(null);
    setImageFile(null);
    setShowForm(false);

    fetchData();
  };

  // TOGGLE AVAILABILITY
  const toggleAvailability = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}/availability`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    fetchData();
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-slate-500">Home / Products</p>
            <h1 className="text-3xl font-semibold text-slate-900 mt-1">
              Products
            </h1>
            <p className="text-slate-500">Manage your store catalog</p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white transition ${
              showForm
                ? "bg-slate-700"
                : "bg-brand-primary hover:bg-brand-secondary"
            }`}
          >
            <PackagePlus size={16} />
            {showForm ? "Cancel" : "Add Product"}
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <Package className="text-brand-primary" />
            <div>
              <p className="text-sm text-slate-500">Total</p>
              <p className="font-semibold">{products?.length || 0}</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <Eye className="text-green-600" />
            <div>
              <p className="text-sm text-slate-500">Visible</p>
              <p className="font-semibold">
                {products.filter((p) => p.available).length || 0}
              </p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <EyeOff className="text-red-600" />
            <div>
              <p className="text-sm text-slate-500">Hidden</p>
              <p className="font-semibold">
                {products.filter((p) => !p.available).length}
              </p>
            </div>
          </div>
        </div>

        {/* ADD PRODUCT PANEL */}
        {showForm && (
          <div className="bg-white border rounded-xl mb-8">
            <div className="p-6 border-b">
              <h2 className="font-semibold">New Product</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Product name"
                  className="border rounded-lg px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Price"
                  className="border rounded-lg px-3 py-2"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <input
                placeholder="Category (example: Cakes, Shoes, Sarees)"
                className="border rounded-lg px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="border rounded-lg px-3 py-2 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* IMAGE UPLOAD */}
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImageFile(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Upload size={24} />
                  <p>Click to upload image</p>
                </div>
              </div>

              {preview && <img src={preview} className="w-32 rounded-lg" />}
            </div>

            <div className="p-6 border-t flex gap-3">
              <button
                onClick={handleAddProduct}
                className="px-6 py-2 bg-[#2E78B7] text-white rounded-lg"
              >
                Add Product
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS GRID */}

        {/* PRODUCTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <div className="h-56 bg-slate-50 border-b flex items-center justify-center p-6">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="block max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-slate-400 text-sm">No Image</div>
                  )}
                </div>

                {/* CATEGORY BADGE */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-brand-primary shadow">
                  {product.category || "General"}
                </div>

                {/* STATUS BADGE */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow ${
                    product.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.available ? "Visible" : "Hidden"}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col justify-between min-h-[170px]">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                    {product.description || "No description"}
                  </p>
                </div>

                {/* PRICE + ACTIONS */}
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xl font-bold text-brand-primary">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAvailability(product._id)}
                      className="flex items-center justify-center gap-1 flex-1 py-2 border rounded-lg text-sm hover:bg-slate-50"
                    >
                      {product.available ? "Hide" : "Show"}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Delete this product?"))
                          deleteProduct(product._id);
                      }}
                      className="flex items-center justify-center gap-1 flex-1 py-2 border border-red-400 text-red-600 rounded-lg text-sm hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
