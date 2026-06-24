import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from './context/useApp';
import './Checkout.css';

function Checkout() {
  const { cartItems, clearCart, isLoggedIn, showToast } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    clearCart();
    showToast('Order placed successfully! Thank you for shopping with Joo Store.');
    setLoading(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout container">
        <div className="checkout-empty">
          <i className="fas fa-shopping-bag" aria-hidden="true" />
          <h2>Your cart is empty</h2>
          <p>Add products before checking out.</p>
          <Link to="/products" className="checkout-btn-link">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="checkout container">
        <div className="checkout-auth-required">
          <i className="fas fa-lock" aria-hidden="true" />
          <h2>Login Required</h2>
          <p>Please log in to complete your purchase.</p>
          <div className="checkout-auth-actions">
            <Link to="/login" className="checkout-btn-link">
              Login
            </Link>
            <Link to="/register" className="checkout-btn-link secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout container">
      <h1 className="checkout-header">Checkout</h1>

      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Details</h2>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Street address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="City"
            />
          </div>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? 'Processing...' : `Place Order — $${totalPrice.toFixed(2)}`}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <ul className="checkout-items">
            {cartItems.map(item => (
              <li key={item.id} className="checkout-item">
                <img src={item.image} alt="" />
                <div>
                  <p className="checkout-item-title">{item.title}</p>
                  <p className="checkout-item-qty">Qty: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/cart" className="back-to-cart">
            ← Back to Cart
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
