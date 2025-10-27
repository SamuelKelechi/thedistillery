import './footer.css'
import { FaLocationDot, FaPhone, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
const Footer = () => {
    return (
        <>
        <div className="footer-main-container">
            <div className="footer-main-wrapper">
                <div className='footer-about'>
                    <h2>About Us</h2>
                    <p>
                        The Distillery is Nigeria’s foremost premium liquor distributor. Buying drinks from our website is the  best and safest way to shop for your drinks in Lagos, Abuja and other states. The process is stress free.
                    </p>
                    <p>
                       Shop here to get the best offers on premium alcoholic beverages, available in retail and in bulk. You can place your order online from the convenience of your home/office to enjoy swift delivery anywhere in Nigeria. 
                    </p>
                </div>
                <div className='footer-find-us'>
                    <h3>FIND US</h3>
                    <span><FaLocationDot color='#edbd43'/> The Distillery Plaza, Call Park, Trade Fair, Lagos</span>
                    <span><FaPhone color='#edbd43'/> 0906 182 3111</span>
                    <span><FaPhone color='#edbd43'/> 0912 211 0950</span>
                    <span><MdEmail color='#edbd43'/> info@thedistillery.ng</span>
                </div>
                <div className='footer-socials'>
                    <h3>SOCIAL NETWORKS</h3>
                   <Link href='https://web.facebook.com/people/thedistilleryng/100087927305461/' target='blank' style={{textDecoration:'none', color:'inherit'}}> <span><FaFacebookF color='#edbd43'/> Thedistillery.ng</span></Link>
                    <Link href='https://www.instagram.com/thedistillery.ng?igshid=YmMyMTA2M2Y%3D' target='blank' style={{textDecoration:'none', color:'inherit'}}> <span><FaInstagram color='#edbd43'/> thedistillery.ng</span></Link>
                </div>
                <div className='footer-quicklinks'>
                    <h3>QUICK LINKS</h3>
                    <Link href='/products' style={{textDecoration:'none', color:'inherit'}}><span>Our Products</span></Link>
                    <Link href='/about' style={{textDecoration:'none', color:'inherit'}}><span>About Us</span></Link>
                    <Link href='/contact' style={{textDecoration:'none', color:'inherit'}}><span>Contact Us</span></Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer