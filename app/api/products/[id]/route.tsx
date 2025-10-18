import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Update product with categories
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    // ✅ Step 1: Update the basic product data
    await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        image1: body.image1,
        image2: body.image2 || null,
        image3: body.image3 || null,
        priceRange: body.priceRange,
        bottlePrice: body.bottlePrice,
        cartonPrice: body.cartonPrice,
        sku: body.sku,
        alcVol: body.alcVol,
      },
    });

    // ✅ Step 2: Remove existing category links
    await prisma.productCategoryLink.deleteMany({
      where: { productId: id },
    });

    // ✅ Step 3: Create new category links
    if (Array.isArray(body.categoryIds) && body.categoryIds.length > 0) {
      await prisma.productCategoryLink.createMany({
        data: body.categoryIds.map((catId: string) => ({
          productId: id,
          categoryId: catId,
        })),
      });
    }

    // ✅ Step 4: Return updated product with categories
    const fullProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
      },
    });

    return NextResponse.json(fullProduct);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }   // 👈 notice the Promise
) {
  const { id } = await params;   // ✅ this line goes here

  try {
    await prisma.productCategoryLink.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    );
  }
}