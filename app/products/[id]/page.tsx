import prisma from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  // ✅ Await params
  const { id } = await props.params;

  // ✅ Fetch product
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <p className="p-6">❌ Product not found</p>;
  }

  // ✅ Normalize nullable fields
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

  // ✅ Use safeProduct (not product)
  return <ProductDetailClient product={safeProduct} />;
}
