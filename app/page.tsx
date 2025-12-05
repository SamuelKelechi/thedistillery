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
        <HeroPage />
        <HowItWorks />
        <Recommended />
        <Categories />
        <Newsletter />  
    </div>
    </>
  );
}