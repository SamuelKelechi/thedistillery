import Link from "next/link";
import "./recommended-card.css";

const RecommendedCard = ({ id, name, image }: any) => {
  return (
    <div className="recommendedCard">
      <div className="recommendedCard_img" style={{ backgroundImage: `url(${image || "/placeholder.png"})`, }}></div>
      <p className="recommendedCard_text">{name}</p>
      <Link href={`/products/${id}`} style={{ textDecoration: "none" }}>
        <button className="recommendedCard_btn button">Buy now</button>
      </Link>
    </div>
  );
};

export default RecommendedCard;
