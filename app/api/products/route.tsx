import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create product
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
          include: {
            category: true,
          },
        },
      },
    });
    console.log("🧩 Raw Products from DB:", products);

    const formatted = products.map((p) => ({
      ...p,
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