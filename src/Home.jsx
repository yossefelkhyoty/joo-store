import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products");
  };
  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container home">
      <div className="home-text">
        <h1>Joo Store</h1>
        <h5>Welcome to my store</h5>
        <p>What you want you will find here</p>
        <div className="home-buttons">
          <button onClick={goToRegister} className="join-us-btn">Join Us</button>
          <button onClick={goToProducts} className="shop-now-btn">Shop Now</button>
        </div>
      </div>
      <div className="home-image">
        <img src="shopping.png" alt="Online Shopping" />
      </div>
    </div>
  );
}

export default Home;