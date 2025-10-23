"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import Swal from "sweetalert2";
import Link from "next/link";


interface ProductDetailClientProps {
   product: {
    id: string;
    name: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    priceRange: string;
    bottlePrice: number;
    cartonPrice: number;
    sku: string;
    bottlesPerCarton: number;
    alcVol: string;
    categories: { id: string; name: string }[];
  };
};

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [purchaseType, setPurchaseType] = useState<"bottle" | "carton" | "">("");
  const [categories, setCategories] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

   useEffect(() => {
  const fetchRelatedProducts = async () => {
    try {
      const firstCategory = product.categories?.[0];
      if (!firstCategory?.id) return;

      const res = await fetch(`/api/products?categoryId=${firstCategory.id}`);
      const data = await res.json();

      const filtered = data.filter((p: any) => p.id !== product.id);

      const shuffled = filtered.sort(() => 0.5 - Math.random());

      const limited = shuffled.slice(0, 6);

      setRelatedProducts(limited);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  fetchRelatedProducts();
}, [product]);


  const handleAddToCart = () => {
    if (!purchaseType) {
       Swal.fire({
      icon: "warning",
      title: "Select an Option",
      text: "Please select Bottle or Carton before adding to cart.",
      confirmButtonColor: "#063A47",
    });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price:
      purchaseType === "carton"
      ? product.cartonPrice ?? 0
      : product.bottlePrice ?? 0,
      quantity: 1,
      sku: product.sku ?? "N/A",
      image1: product.image1 ?? "",
      purchaseType,
      bottlesPerCarton:
      purchaseType === "carton"
      ? product.bottlesPerCarton ?? 0
      : 1,
      alcVol: product.alcVol ?? "",
    });

    Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    text: `${product.name} has been added to your cart.`,
    showConfirmButton: false,
    timer: 1800,
  });
  };

  useEffect(() => {
      fetch("/api/categories")
        .then((res) => res.json())
        .then(setCategories)
        .catch((err) => console.error("Error fetching categories:", err));
    }, []);

  return (
        <>
      <div className="product-page">
        <main className="details-main-content">
          <div className="product-container">
            <div className="product-image-section">
              <>
              {product.image1 && (
                 <img
                  src={product.image1}
                  alt=""
                  className="product-image"
                />
              )}
                
                <div className="thumbnail-container">

                    <div
                      className="thumbnail-wrapper" 
                    >
                      {product.image2 && (
                        <img
                        src={product.image2 || "/placeholder.png"}
                        alt=""
                        className="thumbnail-image"
                      />
                      )}
                    </div>

                    <div
                      className="thumbnail-wrapper" 
                    >
                       {product.image3 && (
                        <img
                        src={product.image3 || "/placeholder.png"}
                        alt=""
                        className="thumbnail-image"
                      />
                      )}
                    </div>

                </div>
              </>
            </div>

            <div className="product-info-section">
              <h1 className="product-titles">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                {product.priceRange}
              </p>
              <div><b>ALC./VOL.:</b> {product.alcVol}</div>
              <br/>
              <div><b>CATEGORY:</b> {" "}
                {product.categories?.length ? (
                  <>
                    {product.categories.map((c) => c?.name ?? "Unnamed").join(", ")}
                  </>
                ) : (
                  <p>No categories assigned</p>
                )}
              </div>
              <br />
              <div className="product-actions">
                <div className="option-selector">
                  <label htmlFor="product-option">Choose option:</label>
                  <select
                    value={purchaseType}
                    onChange={(e) => setPurchaseType(e.target.value as "bottle" | "carton")}
                    className="option-dropdown"
                  >
                    <option value="">- Select Option -</option>
                      <option value="bottle">
                        Bottle - ₦{product.bottlePrice?.toLocaleString() ?? 0}
                      </option>
                      <option value="carton">
                        Carton - ₦{product.cartonPrice?.toLocaleString() ?? 0}
                      </option>
                  </select>
                </div>
                {purchaseType && (
                <p>
                    {purchaseType === "carton"
                      ? `${product.bottlesPerCarton ?? 0} Bottles Per Carton`
                      : "1 Bottle"}
                </p>
                )}

                <button
                style={{cursor:'pointer'}}
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  🛒 Add to Cart
                </button>
              </div>

            </div>
          </div>

          <section className="related-products-section">
            <h2 className="section-title">YOU MAY ALSO LIKE</h2>
            
          <div className="related-products-grid">
    {relatedProducts.length > 0 ? (
      relatedProducts.map((related) => (
        <div key={related.id} className="related-product-card">
          <img
            src={related.image1 || "/placeholder.png"}
            alt={related.name}
            className="related-product-image"
          />
          <h3 className="related-product-name">{related.name}</h3>
          <p className="related-product-price">
            ₦{related.bottlePrice?.toLocaleString() ?? 0}
          </p>
        </div>
      ))
    ) : (
      <p>No related products found.</p>
    )}
  </div>
          </section>
        </main>

      </div>
    </>
  );
}
