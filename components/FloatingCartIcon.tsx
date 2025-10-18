"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

export default function FloatingCartIcon() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="cart-icon" title="Go to Cart" >
      <FaShoppingCart size={22} />
      {mounted && totalItems > 0 && (
        <span
          className="cart-badge"
          style={{
            position: "absolute",
            top: "-6px",
            right: "-6px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
