import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your prisma client


// ✅ Update product
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ⬅️ must await in Next.js
  const body = await req.json();

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        image1: body.image1,
        image2: body.image2,
        image3: body.image3,
        priceRange: body.priceRange,
        bottlePrice: body.bottlePrice,
        cartonPrice: body.cartonPrice,
        sku: body.sku,
        categoryId: body.categoryId,
        alcVol: body.alcVol,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}


// ✅ Delete product
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}