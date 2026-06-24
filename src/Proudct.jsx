import './Proudct.css';
import { useNavigate } from 'react-router-dom';
import { useApp } from './context/useApp';

function Proudct({ myProd }) {
  const navigate = useNavigate();
  const { addToCart, showToast } = useApp();

  const handleCardClick = () => {
    navigate(`/product/${myProd.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(myProd, 1);
    showToast(`${myProd.title} added to cart`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${myProd.id}`);
  };

  return (
    <article className='proudct-card'>
      <div className='card' onClick={handleCardClick} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}>
        <div className="card-image-wrap">
          <img src={myProd.image} alt={myProd.title} loading="lazy" />
        </div>
        <div className='card-body'>
          <h3>{myProd.title}</h3>
          <p className="category">{myProd.category}</p>
          <p className="price">${myProd.price.toFixed(2)}</p>
        </div>
        <div className="card-actions">
          <button type="button" className="add-cart-btn" onClick={handleAddToCart}>
            <i className="fas fa-cart-plus" aria-hidden="true" /> Add
          </button>
          <button type="button" className="view-btn" onClick={handleViewDetails}>
            View
          </button>
        </div>
      </div>
    </article>
  );
}

export default Proudct;
