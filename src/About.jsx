import "./About.css";
import aboutImg from "./assets/AbouUs.png";

function About() {
  return (
    <div className="about container">
      <div className="about-image">
        <img
          src={aboutImg}
          alt="Modern retail store interior showcasing products"
          loading="lazy"
        />
      </div>
      <div className="about-text">
        <h1>About Us</h1>
        <p>At Joo Store, we believe shopping should be simple, inspiring, and fun. We started with one clear mission: to bring you high-quality products at fair prices, while keeping style and convenience at the heart of everything we do.</p>
        <p>Whether you&apos;re looking for everyday essentials or unique finds, Joo Store is here to make your shopping experience easier and more enjoyable.</p>
        <p>Our commitment is to quality, trust, and a touch of creativity in everything we offer.</p>
      </div>
    </div>
  );
}

export default About;
