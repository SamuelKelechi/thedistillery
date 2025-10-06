"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    image1: string | null;
    image2: string | null;
    image3: string | null;
    priceRange: string | null;
    bottlePrice: number | null;
    cartonPrice: number | null;
    sku: string | null;
    bottlesPerCarton: number | null;
    alcVol: string | null;
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [purchaseType, setPurchaseType] = useState<"bottle" | "carton" | "">("");

  const handleAddToCart = () => {
    if (!purchaseType) {
      alert("Please select Bottle or Carton before adding to cart");
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
      sku: product.sku ?? "",
      image1: product.image1 ?? "",
      purchaseType,
      bottlesPerCarton:
        purchaseType === "carton" ? product.bottlesPerCarton ?? 1 : 1,
      alcVol: product.alcVol ?? "",
    });

    alert("✅ Added to cart!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2">{product.description ?? "No description available."}</p>

      {/* Purchase Option */}
      <div className="mt-4">
        <select
          value={purchaseType}
          onChange={(e) => setPurchaseType(e.target.value as "bottle" | "carton")}
          className="border p-2"
        >
          <option value="">- Select Option -</option>
          <option value="bottle">
            Bottle - ₦{(product.bottlePrice ?? 0).toLocaleString()}
          </option>
          <option value="carton">
            Carton - ₦{(product.cartonPrice ?? 0).toLocaleString()}
          </option>
        </select>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {purchaseType === "carton"
          ? `${product.bottlesPerCarton ?? 1} bottles per carton`
          : "1 bottle"}
      </p>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}
