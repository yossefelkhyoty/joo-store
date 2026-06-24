import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useApp } from "./context/useApp";
import "./Navbar.css";
import logoImg from "./assets/Logo.png";

function Navbar() {
    const { cartItemsCount, handleSearch, isLoggedIn, user, logout } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            handleSearch(searchTerm.trim());
            setSearchTerm('');
            setMenuOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const closeMenu = () => setMenuOpen(false);

    const navLinkClass = ({ isActive }) =>
        isActive ? "link active" : "link";

    return (
        <header>
            <div className="navbar container">
                <div className="logo">
                    <Link to="/" onClick={closeMenu}>
                        <img src={logoImg} alt="Joo Store Logo" />
                    </Link>
                </div>

                <button
                    className={`menu-toggle ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <form onSubmit={handleSearchSubmit} className="search-form" role="search">
                    <label htmlFor="nav-search" className="sr-only">Search products</label>
                    <input
                        id="nav-search"
                        type="search"
                        placeholder="Search for a product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn" aria-label="Search">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </button>
                </form>

                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <NavLink className={navLinkClass} to="/" end onClick={closeMenu}>Home</NavLink>
                    <NavLink className={navLinkClass} to="/about" onClick={closeMenu}>About Us</NavLink>
                    <NavLink className={navLinkClass} to="/products" onClick={closeMenu}>Products</NavLink>
                    <NavLink className={navLinkClass} to="/contact" onClick={closeMenu}>Contact Us</NavLink>

                    {isLoggedIn ? (
                        <>
                            <span className="user-welcome">Welcome, {user?.name}</span>
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink className={navLinkClass} to="/login" onClick={closeMenu}>Login</NavLink>
                    )}

                    <NavLink className={navLinkClass} to="/cart" onClick={closeMenu}>
                        <span className="cart-link">
                            <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                            {cartItemsCount > 0 && (
                                <span className="cart-count" aria-label={`${cartItemsCount} items in cart`}>
                                    {cartItemsCount}
                                </span>
                            )}
                        </span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
