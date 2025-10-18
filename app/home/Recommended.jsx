"use client";
import { useEffect, useState } from "react";
import "./recommended.css"
import RecommendedCard from "./recommended-card"

const Recommended = () => {
    const [drinks, setDrinks] = useState([]);

     useEffect(() => {
        const fetchDrinks = async () => {
        try {
            const res = await fetch("/api/products"); // your GET route
            const data = await res.json();

            // Randomize and pick 12
            const random12 = data.sort(() => 0.5 - Math.random()).slice(0, 12);
            setDrinks(random12);
        } catch (err) {
            console.error("Error fetching drinks:", err);
        }
        };

        fetchDrinks();
    }, []);


    return (
        <div className="recommended section">
            <h1 className="recommended_header">Recommended Drinks</h1>
            <div className="card_holder">
                    {drinks.map((drink) => (
                        <RecommendedCard
                            key={drink.id}
                            id={drink.id}
                            name={drink.name}
                            image={drink.image1}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Recommended