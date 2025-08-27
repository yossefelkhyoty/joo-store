import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, updateQuantity, removeFromCart }) {
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart container">
            <h1 className="cart-header">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <i className="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>You haven't added any products yet</p>
                    <Link to="/products" className="continue-shopping">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.title} />
                                </div>

                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p className="item-category">{item.category}</p>
                                    <p className="item-price">${item.price}</p>
                                </div>

                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                <button
                                    className="remove-item"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-item">
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="summary-item">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>

                        <div className="summary-item total">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <button className="checkout-btn">
                            Proceed to Checkout
                        </button>

                        <Link to="/products" className="continue-shopping">
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;