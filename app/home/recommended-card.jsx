import "./recommended-card.css";

const RecommendedCard = () => {
  return (
    <div className="recommendedCard">
      <div className="recommendedCard_img" style={{ backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Martell-VS-2-r5cc7379l5y92oidqzu5y4xv1fcdr9pndsmajaff2u.jpg)` }}></div>
      <p className="recommendedCard_text">Martell VS</p>
      <button className="recommendedCard_btn button">Buy now</button>
    </div>
  );
};

export default RecommendedCard;
