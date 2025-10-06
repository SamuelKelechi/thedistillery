import './globals.css'
import { ReactNode } from "react";
import { CartProvider } from "@/app/context/CartContext";

import Header from "@/components/header/header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}