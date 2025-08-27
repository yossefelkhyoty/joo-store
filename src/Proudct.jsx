import './Proudct.css';
import { useNavigate } from 'react-router-dom';

function Proudct({ myProd }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${myProd.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); 
    navigate(`/product/${myProd.id}`);
  };

  return (
    <div className='proudct container'>
      <div className='card' onClick={handleCardClick}>
        <img
          src={myProd.image}
          alt={myProd.title}
        />
        <div className='card-body'>
          <h3>{myProd.title}</h3>
          <p>{myProd.category}</p>
          <p>${myProd.price}</p>
        </div>
        <button onClick={handleButtonClick}>Buy Now</button>
      </div>
    </div>
  );
}

export default Proudct;