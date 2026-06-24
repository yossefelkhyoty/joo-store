import { Link } from 'react-router-dom';
import { useApp } from './context/useApp';
import './Cart.css';

function Cart() {
    const { cartItems, updateQuantity, removeFromCart } = useApp();
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart container">
            <h1 className="cart-header">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <i className="fas fa-shopping-cart" aria-hidden="true" />
                    <h2>Your cart is empty</h2>
                    <p>You haven&apos;t added any products yet. Start exploring our collection!</p>
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
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="quantity-controls">
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                <button
                                    type="button"
                                    className="remove-item"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label={`Remove ${item.title} from cart`}
                                >
                                    <i className="fas fa-trash" aria-hidden="true" />
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

                        <Link to="/checkout" className="checkout-btn">
                            Proceed to Checkout
                        </Link>

                        <Link to="/products" className="continue-shopping-link">
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
