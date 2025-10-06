import prisma from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  // ✅ Await the params (because Next.js passes it as a Promise)
  const { id } = await props.params;

  // ✅ Fetch product from database
  const product = await prisma.product.findUnique({
    where: { id },
  });

  // ✅ Handle not found
  if (!product) {
    return <p className="p-6">❌ Product not found</p>;
  }

  // ✅ Normalize null values to safe defaults
  const safeProduct = {
    id: product.id,
    name: product.name ?? "Unnamed Product",
    description: product.description ?? "",
    image1: product.image1 ?? null,
    image2: product.image2 ?? null,
    image3: product.image3 ?? null,
    priceRange: product.priceRange ?? null,
    bottlePrice: product.bottlePrice ?? 0,
    cartonPrice: product.cartonPrice ?? 0,
    sku: product.sku ?? "",
    bottlesPerCarton: product.bottlesPerCarton ?? 0,
    alcVol: product.alcVol ?? "",
  };

  // ✅ Pass only safeProduct to the client component
  return <ProductDetailClient product={safeProduct} />;
}
