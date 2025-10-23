import { FaGlassMartiniAlt,} from "react-icons/fa";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import "./howItWorks.css";

const HowItWorks = () => {
    return (
        <div className="how-it-works-container">
            <div className="how-it-works-wrapper">
                <h1 className="how-it-works-header">How It Works</h1>
                <div className="how-it-works-contained">
                    <div className="how-it-works-sections">
                        <div className="how-it-works-items">
                            <FaGlassMartiniAlt size={50} color="#044858ff"/>
                            <p className="how-it-works-steps">Browse Our Collection of Drinks</p>
                        </div>
                        <div className="how-it-works-items">
                            <FaCartShopping size={40} color="#044858ff"/>
                            <p className="how-it-works-steps">Choose Your Favourite and "Add to Cart"</p>
                        </div>
                    </div>
                    
                    <div className="how-it-works-sections">
                        <div className="how-it-works-items">
                            <MdPayment size={40} color="#044858ff"/>
                            <p className="how-it-works-steps">Make your Payment through our secure channel</p>
                        </div>
                        <div className="how-it-works-items">
                            <FaLocationDot size={40} color="#044858ff"/>
                            <p className="how-it-works-steps">Get Your Product Delivered to your Location</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks