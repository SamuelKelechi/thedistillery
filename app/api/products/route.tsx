import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
        categoryId: body.categoryId,
        alcVol: body.alcVol,
      },
    });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return new Response(JSON.stringify(products));
}
