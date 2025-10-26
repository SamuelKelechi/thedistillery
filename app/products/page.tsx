"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [total, setTotal] = useState(0);

   const limit = 20;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  async function fetchProducts(currentPage: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?page=${currentPage}&limit=${limit}`);
      const data = await res.json();

      setProducts(data.products);
      setPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= pages) {
      setPage(newPage);
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.bottlePrice - b.bottlePrice;
      case "price-high-low":
        return b.bottlePrice - a.bottlePrice;
      case "latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;
 
  return (
    <div className="all-products-container">
      <div className="all-breadcrumb"><Link href="/">Home</Link> / All Products</div>

      <div className="all-products-header">
        Showing {((page - 1) * limit) + 1}&nbsp;–&nbsp;
          {Math.min(page * limit, total)} of {total} results
        <select
          className="all-sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default sorting</option>
          <option value="latest">Sort by latest</option>
          <option value="price-low-high">Sort by price: low to high</option>
          <option value="price-high-low">Sort by price: high to low</option>
        </select>
      </div>

      <div className="all-products-grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="all-product-card">
            {product.image1 && <img src={product.image1} alt={product.name} />}
            <p className="all-category">
              {product.categories?.map((c: any) => c?.category?.name ?? "Unnamed").join(", ")}
            </p>
            <h3 className="all-name">{product.name}</h3>
            <p className="all-price">{product.priceRange}</p>
            <Link href={`/products/${product.id}`}>
              <button className="all-btn">Select options</button>
            </Link>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              style={{ padding: "6px 12px" }}
            >
              Prev
            </button>

            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  padding: "6px 12px",
                  background: page === i + 1 ? "#000" : "#f0f0f0",
                  color: page === i + 1 ? "#fff" : "#000",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pages}
              style={{ padding: "6px 12px" }}
            >
              Next
            </button>
          </div>
    </div>
  );
}