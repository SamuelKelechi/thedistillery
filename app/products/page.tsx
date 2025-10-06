import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      ALL PRODUCTS
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow p-4 flex flex-col items-center"
          >
            {/* ✅ Product Image */}
            <div className="flex gap-4 mt-4">
          {product.image1 && <img src={product.image1} alt={product.name} width={200} height={200}/>}
          {product.image2 && <img src={product.image2} alt={product.name} width={200} height={200} className="w-40 h-40 object-cover rounded" />}
          {product.image3 && <img src={product.image3} alt={product.name} width={200} height={200} className="w-40 h-40 object-cover rounded" />}
        </div>
      

          {/* ✅ Product Info */}
          <h2 className="text-lg font-semibold">{product.name}</h2>
          {product.alcVol ? (<h3 className="text-lg font-semibold">Alc/Vol {product.alcVol}</h3>): null}
          <p className="text-gray-600">{product.description}</p>
          <p className="font-bold mt-2">{product.priceRange}</p>
          <Link href={`/products/${product.id}`}>
          <button>Buy</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
