import "../styles/recommended.css"
import RecommendedCard from "./recommended-card"

const Recommended = () => {
    return (
        <div className="recommended section">
            <h1 className="recommended_header">Recommended Drinks</h1>
            <div className="card_holder">
                <RecommendedCard />
                <RecommendedCard />
                <RecommendedCard />
                <RecommendedCard /> 
                <RecommendedCard /> 
                <RecommendedCard /> 
                <RecommendedCard /> 
                <RecommendedCard /> 
                <RecommendedCard /> 
                <RecommendedCard /> 
                <RecommendedCard /> 
                <RecommendedCard /> 
            </div>
        </div>
    )
}

export default Recommended