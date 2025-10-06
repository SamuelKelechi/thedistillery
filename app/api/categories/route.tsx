import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all categories
export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

// Create a category
export async function POST(req: Request) {
  const body = await req.json();
  const category = await prisma.category.create({
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(category);
}
