import "./about.css";

function About() {
  return(
    <div className="about container">
      <div className="about-image">
        <img src="about.jpg" alt="About Joo Store" />
      </div>
      <div className="about-text">
        <h1>About Us</h1>
        <p>At Joo, we believe shopping should be simple, inspiring, and fun. We started Joo with one clear mission: to bring you high-quality products at fair prices, while keeping style and convenience at the heart of everything we do.</p>
        <p>Whether you’re looking for everyday essentials or unique finds, Joo is here to make your shopping experience easier and more enjoyable.</p>
        <p>Our commitment is to quality, trust, and a touch of creativity in everything we offer.</p>
      </div>
    </div>
  );
}

export default About;