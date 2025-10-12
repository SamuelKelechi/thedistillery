import "./category-card.css";
import { FaCircleArrowRight } from "react-icons/fa6";

const CategoryCard = () => {
  return (
    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Bombay-Sapphire-Drink-1-py27hbtogtini5rl9vknhiawitvsuilvynngl7afbi.jpg)`}}></div>
      <p className="categoryCard_text">Martell VS</p>
      <button className="categoryCard_btn button">
        Shop here
        <FaCircleArrowRight size={15} />
      </button>
    </div>
  );
};

export default CategoryCard;
