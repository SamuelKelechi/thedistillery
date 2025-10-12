import './globals.css'
import { ReactNode } from "react";
import { CartProvider } from "@/app/context/CartContext";

import Header from "@/components/header/header";
import Footer from '@/components/footer/footer';
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />

           <div className="floating-icons">
            <a href="/cart" className="cart-icon" title="Go to Cart">
              <FaShoppingCart />
            </a>
            <a
              href="https://wa.me/2349061823111"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-icon"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}