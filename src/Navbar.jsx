import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css"

function Navbar({ cartItemsCount, onSearch, isLoggedIn }) {
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch && searchTerm.trim()) {
            onSearch(searchTerm.trim());
        }
        setSearchTerm('');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <header>
            <div className="navbar container">
                <div className="logo">
                    <Link to="/">
                        <img src="logo.png" alt="Joo Store Logo" />
                    </Link>
                </div>

                {/* Search bar */}
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search for a product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">
                        <i className="fas fa-search"></i>
                    </button>
                </form>

                <nav>
                    <Link className="link" to={"/"}>Home</Link>
                    <Link className="link" to={"/about"}>About Us</Link>
                    <Link className="link" to={"/products"}>Products</Link>
                    <Link className="link" to={"/contact"}>Contact Us</Link>

                    {isLoggedIn ? (
                        <>
                            <span className="user-welcome">Welcome, {user.name}</span>
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="link" to={"/login"}>Login</Link>
                        </>
                    )}

                    <Link className="link cart-link" to={"/cart"}>
                        <i className="fas fa-shopping-cart"></i>
                        {cartItemsCount > 0 && (
                            <span className="cart-count">{cartItemsCount}</span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;