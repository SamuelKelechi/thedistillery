import "./categories.css";
import CategoryCard from "./category-card";

const Categories = () => {
  return (
    <div className="categories section">
      <h1 className="categories_header">Explore Drink Categories</h1>
      <div className="card_holder">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
};

export default Categories;
