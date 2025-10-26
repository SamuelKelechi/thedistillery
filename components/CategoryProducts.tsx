"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function CategoryProducts({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 20;

  useEffect(() => {
    fetchCategoryProducts(page);
  }, [page]);

  async function fetchCategoryProducts(currentPage: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?categoryId=${categoryId}&page=${currentPage}&limit=${limit}`);
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

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="product-category-details-container">

         <p style={{ marginBottom: "1rem", width:"90%" }}>
            Showing {start} – {end} of {total} results
        </p>
        <div className="product-category-details-wrapper">

        {loading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
        ) : products.length > 0 ? (
            products.map((product) => (
            <div className="product-category-details-card" key={product.id}>
                <Link href={`/products/${product.id}`} className="product-category-details-Link">
                <img
                    src={product.image1 ?? "/placeholder.jpg"}
                    alt={product.name}
                    className="product-category-details-img"
                />
                <p className="product-category-details-para">
                    {product.name} <FaArrowAltCircleRight size={20} />
                </p>
                </Link>
            </div>
            ))
        ) : (
            <p className="product-category-details-not-found">No products found in this category.</p>
        )}

        {pages > 1 && (
            <div className="pagination-controls" style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="all-btn"
                style={{ marginRight: "10px" }}
            >
                Previous
            </button>
            <span>
                Page {page} of {pages}
            </span>
            <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="all-btn"
                style={{ marginLeft: "10px" }}
            >
                Next
            </button>
            </div>
        )}
        </div>

    </div>
  );
}
