"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    priceRange: "",
    bottlePrice: "",
    cartonPrice: "",
    sku: "",
    categoryId: "",
    alcVol: "",
    bottlesPerCarton: "",
  });

  // 🔎 Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // ✅ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Product deleted!");
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("❌ Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error deleting product");
    }
  };

  // ✅ Start editing
  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
        name: product.name ?? "",
        description: product.description ?? "",
        image1: product.image1 ?? "",
        image2: product.image2 ?? "",
        image3: product.image3 ?? "",
        priceRange: product.priceRange ?? "",
        bottlePrice: product.bottlePrice ?? 0,
        cartonPrice: product.cartonPrice ?? 0,
        sku: product.sku ?? "",
        categoryId: product.categoryId ?? "",
        alcVol: product.alcVol ?? "",
        bottlesPerCarton: product.bottlesPerCarton ?? 0,
    });
  };

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
// ✅ Submit (Create or Update)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Convert numeric fields safely
  const payload = {
    ...form,
    bottlePrice: form.bottlePrice ? Number(form.bottlePrice) : 0,
    cartonPrice: form.cartonPrice ? Number(form.cartonPrice) : 0,
    bottlesPerCarton: form.bottlesPerCarton ? Number(form.bottlesPerCarton) : 0,
  };

  if (editingId) {
    // 🔹 Update
    const res = await fetch(`/api/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Product updated!");
      const updated = await fetch("/api/products").then((res) => res.json());
      setItems(updated);
      setEditingId(null);
      resetForm();
    }
  } else {
    // 🔹 Create
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Product added!");
      const updated = await fetch("/api/products").then((res) => res.json());
      setItems(updated);
      resetForm();
    }
  }
};
  // ✅ Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      image1: "",
      image2: "",
      image3: "",
      priceRange: "",
      bottlePrice: "",
      cartonPrice: "",
      sku: "",
      categoryId: "",
      alcVol: "",
      bottlesPerCarton: "",
    });
  };

  // 🔎 Apply search + filter
  const filteredItems = items.filter((product) => {
  const name = product.name?.toString().toLowerCase() || "";
  const sku = product.sku?.toString().toLowerCase() || "";

  const matchesSearch =
    name.includes(searchTerm.toLowerCase()) ||
    sku.includes(searchTerm.toLowerCase());

  const matchesCategory =
    !selectedCategory || product.categoryId === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <>
     {/* 🔎 Search + Filter Controls */}
      <div>
        <input
          type="text"
          placeholder="Search by name or SKU"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add / Edit form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4"
        style={{ display: "flex", flexDirection: "column", width: "500px" }}
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Product name"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Description"
        />
        <input
          type="text"
          name="image1"
          value={form.image1}
          onChange={handleChange}
          required
          placeholder="Image 1 URL"
        />
        <input
          type="text"
          name="image2"
          value={form.image2}
          onChange={handleChange}
          placeholder="Image 2 URL"
        />
        <input
          type="text"
          name="image3"
          value={form.image3}
          onChange={handleChange}
          placeholder="Image 3 URL"
        />
        <input
          type="text"
          name="priceRange"
          value={form.priceRange}
          onChange={handleChange}
          required
          placeholder="Price Range e.g. 12,000.00 - 74,000.00"
        />
        <input
          type="number"
          name="bottlePrice"
          value={form.bottlePrice}
          onChange={handleChange}
          required
          placeholder="Bottle Price"
        />
        <input
          type="number"
          name="cartonPrice"
          value={form.cartonPrice}
          onChange={handleChange}
          required
          placeholder="Carton Price"
        />
         <input
          type="number"
          name="bottlesPerCarton"
          value={form.bottlesPerCarton}
          onChange={handleChange}
          required
          placeholder="bottlesPerCarton"
        />
          <input
          type="text"
          name="alcVol"
          value={form.alcVol}
          onChange={handleChange}
          required
          placeholder="Alcoholic Vol"
        />
        <input
          type="text"
          name="sku"
          value={form.sku}
          onChange={handleChange}
          required
          placeholder="SKU"
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              resetForm();
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Products List */}
      <div >
        <h1 >Admin Products</h1>
        <ul
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {filteredItems.map((product) => (
            <li
              key={product.id}
              style={{ width: "250px", marginTop: "15px" }}
            >
              <img src={product.image1} width={200} height={200} />
              <p>{product.name}</p>
              <h2>Alc/Vol. {product.alcVol}</h2>

              <p>SKU: {product.sku}</p>
              <p>₦{product.bottlePrice.toLocaleString()} (Bottle)</p>
              <p>₦{product.cartonPrice.toLocaleString()} (Carton)</p>

              <div>
                <button
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
