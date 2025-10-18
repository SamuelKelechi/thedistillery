import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q) return NextResponse.json({ products: [], categories: [] });

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { name: { contains: q, mode: "insensitive" } },
    }),
    prisma.category.findMany({
      where: { name: { contains: q, mode: "insensitive" } },
    }),
  ]);

  return NextResponse.json({ products, categories });
}