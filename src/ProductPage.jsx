import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductPage.css';

function ProductPage({ addToCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            // Add the requested quantity of the product
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
            alert(`Added ${quantity} of ${product.title} to your cart`);
        }
    };

    if (loading) {
        return <div className="loading">Loading product...</div>;
    }

    if (!product) {
        return (
            <div className="container">
                <div className="product-not-found">
                    <h2>Product not found</h2>
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

                    <div className="product-price">${product.price}</div>

                    <div className="quantity-selector">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        />
                    </div>

                    <button onClick={handleAddToCart} className="buy-now-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;