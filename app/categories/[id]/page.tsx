import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

type Props = {
  params: {
    id: string;
  };
};

export default async function CategoryPage({ params }: Props) {
  const { id } = await params; // ✅ await the params

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        include: { product: true },
      },
    },
  });

  if (!category) {
    return <h4>Category not found.</h4>;
  }

  const products = category.products.map((p) => p.product);

  return (
    <div className="product-category-details-container">
      <h1 className="product-category-details-name">{category.name}</h1>
      <div className="product-category-details-wrapper">
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <div className="product-category-details-card" key={product.id}>
                <Link href={`/products/${product.id}`} className="product-category-details-Link">
                  <img src={product.image1 ?? "/placeholder.jpg"} alt={product.name} className="product-category-details-img"/>
                    <p className="product-category-details-para">{product.name} <FaArrowAltCircleRight size={20}/></p>
                </Link>
              </div>
            ))}
          </>

        ):(
          <p className="product-category-details-not-found">No products found in this category.</p>
        )}
        
      </div>
    </div>
  );
}
