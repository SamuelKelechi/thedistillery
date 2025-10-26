import { prisma } from "@/lib/prisma";
import CategoryProducts from "../../../components/CategoryProducts";

type Props = {
  params: {
    id: string;
  };
};

export default async function CategoryPage({ params }: Props) {
  const { id } = params;

  const category = await prisma.category.findUnique({
    where: { id },
    select: { id: true, name: true },
  });

  if (!category) {
    return <h4>Category not found.</h4>;
  }

  return (
    <div className="product-category-details-container">
      <h1 className="product-category-details-name">{category.name}</h1>
      <CategoryProducts categoryId={category.id} />
    </div>
  );
}
