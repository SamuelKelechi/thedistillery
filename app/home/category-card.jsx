import Link from "next/link";
import "./category-card.css";
import { FaCircleArrowRight } from "react-icons/fa6";

const CategoryCard = () => {
  return (
    <>
    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Flirt-Vodka-1L-3-r3kkvfi3pk61ru3gw8t8kywhly0ob8l3zv0s4zuhhq.jpg)`}}></div>
      <p className="categoryCard_text">Spirit</p>
      <Link href="/categories/68ce84036457d49882ce1eff" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
      </Link>
    </div>

    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/The-Singleton-2-r3kn0i9o4hohsq4ytk7x1ip77e47hqkqlcu4ttkb9q.jpg)`}}></div>
      <p className="categoryCard_text">Whiskey</p>
      <Link href="/categories/68ce83d56457d49882ce1efe" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
      </Link>
    </div>
    
    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Rosso-Nobile-Choco-q07xzriflxskkjy3uktbgzv5yxiwc7z2z7srzjjmdq.jpg)`}}></div>
      <p className="categoryCard_text">Wines</p>
      <Link href="/categories/68ce840b6457d49882ce1f00" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
      </Link>
    </div>

    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Bacardi-4years-HD-1-scaled-py27g3n9jlu6chjrfuh6qbg8lpxjsqqi4kzn173xfy.jpeg)`}}></div>
      <p className="categoryCard_text">Vodka</p>
      <Link href="/categories/68ce84136457d49882ce1f01" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
        </Link>
    </div>

    <div className="categoryCard">
      <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Rum-Categories-pvohaed8pvzetmyxcivv3g1joo2w8qoh27oihepkpa.jpg)`}}></div>
      <p className="categoryCard_text">Rum</p>
      <Link href="/categories/68ce841d6457d49882ce1f02" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
        </Link>
    </div>

    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Bombay-Sapphire-Drink-1-py27hbtogtini5rl9vknhiawitvsuilvynngl7afbi.jpg)`}}></div>
      <p className="categoryCard_text">Gin</p>
      <Link href="/categories/68ce84266457d49882ce1f04" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
        </Link>
    </div>

    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Smirnoff-Ice-Vodka-pvoh0teh1ov6gqw0avrs6d3do9b6rtmzes9bcux24u.jpg)`}}></div>
      <p className="categoryCard_text">Flavoured Vodka</p>
      <Link href="/categories/68ce84426457d49882ce1f05" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
        </Link>
    </div>

    <div className="categoryCard">
       <div className="categoryCard_img" style={{backgroundImage: `url(https://thedistillery.ng/wp-content/uploads/elementor/thumbs/Baileys-Cream-pvqcm45l7vv9ogdxjotbxbuqb7w307nymhtxxv1ij2.jpg)`}}></div>
      <p className="categoryCard_text">Cream</p>
      <Link href="/categories/68ce84496457d49882ce1f06" style={{ textDecoration: "none" }}>
        <button className="categoryCard_btn button">
          Shop here
          <FaCircleArrowRight size={15} />
        </button>
      </Link>
    </div>
    </>
  );
};

export default CategoryCard;
