import "../styles/howItWorks.css";
import { FaCartShopping } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaMartiniGlass } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";

const HowItWorks = () => {
    return (
        <div className="howItWorks">
            <h1 className="howItWorks_header">How It Works</h1>
            <div className="howItWorks_card_holder">
                <div className="howItWorks_card">
                    <FaMartiniGlass size={35} />
                    <p className="howItWorks_text">Browse our collection of drinks</p>
                </div>
                <div className="howItWorks_card">
                    <FaCartShopping size={35} />
                    <p className="howItWorks_text">Choose your favourite and &quot;add to cart&quot;</p>
                </div>
                <div className="howItWorks_card">
                    <FaRegCreditCard size={35} />
                    <p className="howItWorks_text">Make your payment <span className="howItWorks_span"> through our secure channel </span> </p>
                </div>
                <div className="howItWorks_card">
                    <FaLocationDot size={35} />
                    <p className="howItWorks_text">Get your product delivered <span className="howItWorks_span">to your</span> location</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks