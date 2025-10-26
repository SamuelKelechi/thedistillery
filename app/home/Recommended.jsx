"use client";
import { useEffect, useState } from "react";
import "./recommended.css";
import RecommendedCard from "./recommended-card";
import SkeletonCard from "../../components/recommended/skeleton-card";

const Recommended = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDrinks = async () => {
    try {
      const res = await fetch("/api/products?limit=100"); // fetch more products
      const data = await res.json();

      // make sure we’re using the products array
      const list = Array.isArray(data.products) ? data.products : [];
      const random12 = list.sort(() => 0.5 - Math.random()).slice(0, 12);

      setDrinks(random12);
    } catch (err) {
      console.error("Error fetching drinks:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDrinks();
  }, []);

  return (
    <div className="recommended section">
      <h1 className="recommended_header">Recommended Drinks</h1>
      <div className="card_holder">
        {loading
          ?
            Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : drinks.map((drink) => (
              <RecommendedCard
                key={drink.id}
                id={drink.id}
                name={drink.name}
                image={drink.image1}
              />
            ))}
      </div>
    </div>
  );
};

export default Recommended;