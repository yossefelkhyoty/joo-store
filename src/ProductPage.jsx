import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import { useApp } from './context/useApp';
import { fetchProduct } from './services/api';
import './ProductPage.css';

function ProductPage() {
    const { id } = useParams();
    const { addToCart, showToast } = useApp();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedFeedback, setAddedFeedback] = useState(false);

    const loadProduct = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProduct(id);
            if (!data || data.message === 'Product not found') {
                setProduct(null);
            } else {
                setProduct(data);
            }
        } catch (err) {
            setError(err.message || 'Failed to load product.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            showToast(`Added ${quantity} × ${product.title} to cart`);
            setAddedFeedback(true);
            setTimeout(() => setAddedFeedback(false), 2000);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading product..." />;
    }

    if (error) {
        return (
            <div className="container">
                <ErrorState message={error} onRetry={loadProduct} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container">
                <div className="product-not-found">
                    <i className="fas fa-box-open" aria-hidden="true" />
                    <h2>Product not found</h2>
                    <p>The product you are looking for does not exist or has been removed.</p>
                    <Link to="/products" className="back-link">← Back to Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <Link to="/products" className="back-link">← Back to Products</Link>

            <div className="product-page">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="product-details">
                    <h1>{product.title}</h1>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-price">${product.price.toFixed(2)}</div>

                    <div className="quantity-selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <div className="quantity-controls-inline">
                            <button
                                type="button"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                max="99"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                            <button
                                type="button"
                                onClick={() => setQuantity(q => q + 1)}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`buy-now-btn ${addedFeedback ? 'added' : ''}`}
                    >
                        {addedFeedback ? '✓ Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
