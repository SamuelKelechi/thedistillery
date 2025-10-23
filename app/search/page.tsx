"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  sku: string;
  image1: string;
  bottlePrice: number;
  cartonPrice: number;
  categoryId: string;
  alcVol: string;
};

type Category = {
  id: string;
  name: string;
};

function SearchContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const trimmedQuery = query.trim().toLowerCase();
        if (!trimmedQuery) {
          setProducts([]);
          setCategories([]);
          setLoading(false);
          return;
        }

        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/categories", { cache: "no-store" }),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch data");

        const allProducts = await productsRes.json();
        const allCategories = await categoriesRes.json();

        const filteredProducts = allProducts.filter((p: Product) =>
          p.name?.toLowerCase().includes(trimmedQuery)
        );
        const filteredCategories = allCategories.filter((c: Category) =>
          c.name?.toLowerCase().includes(trimmedQuery)
        );

        setProducts(filteredProducts);
        setCategories(filteredCategories);
        setActiveCategory(null);
      } catch (err) {
        console.error("❌ Search error:", err);
        setProducts([]);
        setCategories([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);

 const handleCategoryClick = async (categoryId: string) => {
  setLoading(true);
  const res = await fetch("/api/products", { cache: "no-store" });
  const allProducts: Product[] = await res.json();
  const filteredProducts = allProducts.filter(
    (p) => p.categoryId === categoryId
  );

  const clickedCategory = categories.find((c) => c.id === categoryId) || null;
  setProducts(filteredProducts);
  setActiveCategory(clickedCategory);
  setLoading(false);
};

  if (loading) return <p className="query-loading">Loading results...</p>;

  return (
    <div className="query-container">
      {/* 🔹 Header / Breadcrumb */}
      <div className="query-header">
        {activeCategory ? (
          <p className="query-breadcrumb">
            Showing products in category:{" "}
            <span className="query-breadcrumb-active">{activeCategory.name}</span>
            <button
              onClick={() => {
                setActiveCategory(null);
                router.push(`/search?q=${query}`);
              }}
              className="query-clear-btn"
            >
              Clear
            </button>
          </p>
        ) : (
          <h1 className="query-title">Search results for: “{query}”</h1>
        )}
      </div>

      {/* 🔹 Categories */}
      {!activeCategory && categories.length > 0 && (
        <div className="query-category-section">
          <h2 className="query-subtitle">Matching Categories</h2>
          <ul className="query-category-list">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="query-category-item"
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 Products */}
      {products.length > 0 ? (
        <div className="query-product-section">
          <h2 className="query-subtitle">
            {activeCategory
              ? `Products in ${activeCategory.name}`
              : "Matching Products"}
          </h2>
          <ul className="query-product-list">
            {products.map((product) => (
              <li key={product.id} className="query-product-card">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="query-product-image"
                />
                <p className="query-product-name">{product.name}</p>
                <p className="query-product-sku">SKU: {product.sku}</p>
                <p className="query-product-price">
                  ₦{product.bottlePrice.toLocaleString()} (Bottle)
                </p>
                <p className="query-product-price">
                  ₦{product.cartonPrice.toLocaleString()} (Carton)
                </p>

                <Link href={`/products/${product.id}`}>
                  <button className="query-btn">Buy / Details</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="query-empty">No products found.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="query-loading">Loading search results...</p>}>
      <SearchContent />
    </Suspense>
  );
}