"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  cartItemId: string;
  id: string; // productId
  name: string;
  price: number;
  quantity: number;
  sku: string;
  image1: string;
  purchaseType: "bottle" | "carton";
  bottlesPerCarton: number;
  alcVol: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "cartItemId">) => void; // ✅ fixed
  removeFromCart: (id: string, sku: string, purchaseType: "bottle" | "carton") => void;
  clearCart: () => void;
  updateQuantity: (id: string, sku: string, purchaseType: "bottle" | "carton", quantity: number) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "cartItemId">) => {
    const newItem: CartItem = {
      ...item,
      cartItemId: crypto.randomUUID(),
    };

    setCart((prev) => {
      const existing = prev.find(
         (i) =>
          i.id === item.id &&
          i.sku === item.sku &&
          i.purchaseType === item.purchaseType &&
          i.price === item.price &&
          i.alcVol === item.alcVol &&                // ✅ added
          i.bottlesPerCarton === item.bottlesPerCarton // ✅ added
      );

      if (existing) {
        return prev.map((i) =>
         i.id === item.id &&
          i.sku === item.sku &&
          i.purchaseType === item.purchaseType &&
          i.price === item.price &&
          i.alcVol === item.alcVol &&
          i.bottlesPerCarton === item.bottlesPerCarton
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, newItem];
    });
  };

   const removeFromCart = (id: string, sku: string, purchaseType: "bottle" | "carton") => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.sku === sku && item.purchaseType === purchaseType))
    );
  };

  const clearCart = () => setCart([]);

 const updateQuantity = (id: string, sku: string, purchaseType: "bottle" | "carton", quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.sku === sku && item.purchaseType === purchaseType
          ? { ...item, quantity }
          : item
      )
    );
  };

 const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}