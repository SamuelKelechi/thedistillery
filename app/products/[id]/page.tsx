import prisma from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  // ✅ await the params
  const { id } = await props.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <p className="p-6">❌ Product not found</p>;
  }

  return <ProductDetailClient product={product} />;
}
