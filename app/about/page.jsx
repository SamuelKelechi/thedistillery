import Link from "next/link";

export default function AboutLight() {
  return (
    <div className="about-page about">
      <section className="about-hero about-container">
        <h1>About Us</h1>
      </section>

      <main className="about-container about-main-content">
        <section className="about-intro">
          <div className="about-intro-left">
            <img src="https://thedistillery.ng/wp-content/uploads/2022/11/Martell-XO-1.jpg" alt="editing desk" />
          </div>

          <div className="about-intro-right">
            <h3 className="about-sm-title">About Us</h3>
            <h2>We Always Make The Best</h2>
            <p>
                The Distillery is Nigeria’s foremost premium liquor distributor. Buying drinks from our website is the best and safest way to shop for your drinks in Lagos, Abuja and other states. The process is stress free.
                <br/>
                Shop here to get the best offers on premium alcoholic beverages, available in retail and in bulk. You can place your order online from the convenience of your home/office to enjoy swift delivery anywhere in Nigeria.
            </p>
            <Link href="/contact" style={{ textDecoration: "none" }}><button className="about-btn-primary">Contact Us</button></Link>

            <div className="about-stats">
              <div>
                <strong>7+</strong>
                <span>Year Of Experience</span>
              </div>
              <div>
                <strong>12,000+</strong>
                <span>Bottles Sold</span>
              </div>
              <div>
                <strong>4200+</strong>
                <span>Satisfied Client</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}