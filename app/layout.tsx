import './globals.css'
<script src="https://js.paystack.co/v1/inline.js"></script>
import { ReactNode } from "react";
import { CartProvider } from "@/app/context/CartContext";
import FloatingCartIcon from "@/components/FloatingCartIcon";
import Header from "@/components/header/header";
import Footer from '@/components/footer/footer';
import { FaWhatsapp } from "react-icons/fa";
import AgeVerification from "@/components/AgeVerification";

export const metadata = {
  title: "The Distillery - Premium Drinks Store",
  description: "Shop premium and affordable drinks delivered fast.",
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <AgeVerification />
          {children}
          <Footer />

          <div className="floating-icons">
            <FloatingCartIcon />
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
