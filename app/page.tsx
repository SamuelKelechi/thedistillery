import Link from "next/link";
import HeroPage from './home/HeroPage'
import HowItWorks from './home/HowItWorks'
import Recommended from './home/Recommended'
import Categories from './home/Categories'
import Newsletter from './home/NewsLetter'



export default function Home() {
  return (
    <>
    <div className="home-main-holder">
      
        {/* <ul className="list-disc pl-6">
          <nav style={{width:"350px", display:"flex", justifyContent:"space-between"}}>
            <a href="/admin">Product Admin</a>
            <a href="/admin/categories">Categories Admin</a>
            <a href="/products">All Products</a>
          </nav>
        </ul> */}
        <HeroPage />
        <HowItWorks />
        <Recommended />
        <Categories />
        <Newsletter />
    </div>
    </>
    
  );
}