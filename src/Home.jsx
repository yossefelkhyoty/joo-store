import "./Home.css";
import { useNavigate } from "react-router-dom";
import homeImg from "./assets/homePage.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container home">
      <div className="home-text">
        <span className="home-badge">Your One-Stop Shop</span>
        <h1>Joo Store</h1>
        <h5>Quality Products, Fair Prices</h5>
        <p>Discover curated essentials and unique finds — delivered with style and convenience.</p>
        <div className="home-buttons">
          <button onClick={() => navigate("/register")} className="join-us-btn">
            Join Us
          </button>
          <button onClick={() => navigate("/products")} className="shop-now-btn">
            Shop Now
          </button>
        </div>
        <div className="home-stats">
          <div className="stat">
            <strong>20+</strong>
            <span>Products</span>
          </div>
          <div className="stat">
            <strong>Free</strong>
            <span>Shipping</span>
          </div>
          <div className="stat">
            <strong>24/7</strong>
            <span>Support</span>
          </div>
        </div>
      </div>
      <div className="home-image">
        <img
          src={homeImg}       
          alt="Person shopping online with bags and packages"
          loading="eager"
        />
      </div>
    </div>
  );
}

export default Home;
