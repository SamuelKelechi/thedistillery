import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create product (default inStock = true)
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        image1: body.image1,
        image2: body.image2 || null,
        image3: body.image3 || null,
        priceRange: body.priceRange,
        bottlePrice: parseFloat(body.bottlePrice),
        cartonPrice: parseFloat(body.cartonPrice),
        sku: body.sku,
        alcVol: body.alcVol,
        bottlesPerCarton: parseInt(body.bottlesPerCarton) || 0,
        inStock: true, // ✅ ensure product is in stock by default
      },
    });

    // If categories were selected, link them
    if (Array.isArray(body.categoryIds) && body.categoryIds.length > 0) {
      await Promise.all(
        body.categoryIds.map(async (catId: string) => {
          await prisma.productCategoryLink.create({
            data: {
              productId: product.id,
              categoryId: catId,
            },
          });
        })
      );
    }

    return new Response(JSON.stringify({ success: true, product }), {
      status: 201,
    });
  } catch (error: any) {
    console.error("❌ Error creating product:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          include: { category: true },
        },
      },
    });

    const formatted = products.map((p) => ({
      ...p,
      // Force inStock to be Boolean (default false)
      inStock: p.inStock ?? false,
      categoryNames: p.categories.map((c) => c.category.name),
    }));

    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}