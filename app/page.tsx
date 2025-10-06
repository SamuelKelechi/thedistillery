

import Link from "next/link";
import HeroPage from './home/HeroPage'

export default function Home() {
  return (
    <>
      
        {/* <ul className="list-disc pl-6">
          <nav style={{width:"350px", display:"flex", justifyContent:"space-between"}}>
            <a href="/admin">Product Admin</a>
            <a href="/admin/categories">Categories Admin</a>
            <a href="/products">All Products</a>
          </nav>
        </ul> */}
        <HeroPage />
   
    </>
    
  );
}