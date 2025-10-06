"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function SearchPage() {
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

      const productsRes = await fetch("/api/products");
      const allProducts: Product[] = await productsRes.json();

      const categoriesRes = await fetch("/api/categories");
      const allCategories: Category[] = await categoriesRes.json();

      // 🔹 Partial match for search term
      const filteredProducts = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query)
      );

      const filteredCategories = allCategories.filter((c) =>
        c.name.toLowerCase().includes(query)
      );

      setProducts(filteredProducts);
      setCategories(filteredCategories);
      setActiveCategory(null); // Reset any active category
      setLoading(false);
    };

    fetchData();
  }, [query]);

  const handleCategoryClick = async (categoryId: string) => {
    setLoading(true);
    const res = await fetch("/api/products");
    const allProducts: Product[] = await res.json();
    const filteredProducts = allProducts.filter(
      (p) => p.categoryId === categoryId
    );

    const clickedCategory = categories.find((c) => c.id === categoryId) || null;

    setProducts(filteredProducts);
    setActiveCategory(clickedCategory);
    setLoading(false);
  };

  if (loading) return <p className="p-4">Loading results...</p>;

  return (
    <div className="p-6">
      {/* 🔹 Breadcrumb / Active filter display */}
      <div className="mb-4">
        {activeCategory ? (
          <p>
            Showing products in category:{" "}
            <span className="font-semibold">{activeCategory.name}</span>{" "}
            <button
              onClick={() => {
                setActiveCategory(null);
                router.push(`/search?q=${query}`);
              }}
              className="text-blue-500 underline ml-2"
            >
              Clear
            </button>
          </p>
        ) : (
          <h1 className="text-2xl font-bold">
            Search results for: "{query}"
          </h1>
        )}
      </div>

      {/* Categories */}
      {!activeCategory && categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Matching Categories</h2>
          <ul className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="border p-4 rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200"
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Products */}
      {products.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {activeCategory ? `Products in ${activeCategory.name}` : "Matching Products"}
          </h2>
          <ul className="flex gap-6 flex-wrap">
            {products.map((product) => (
              <li
                key={product.id}
                className="border p-4 rounded-md flex flex-col items-center"
                style={{ width: "250px" }}
              >
                <img
                  src={product.image1}
                  alt={product.name}
                  width={200}
                  height={200}
                />
                <p className="font-semibold mt-2">{product.name}</p>
                <p>SKU: {product.sku}</p>
                <p>₦{product.bottlePrice.toLocaleString()} (Bottle)</p>
                <p>₦{product.cartonPrice.toLocaleString()} (Carton)</p>

                <Link href={`/products/${product.id}`}>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Buy / Details
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
