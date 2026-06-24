import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <div className="container notfound">
            <span className="notfound-code">404</span>
            <h1>Page Not Found</h1>
            <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <div className="notfound-actions">
                <Link to="/" className="notfound-btn primary">Go Home</Link>
                <Link to="/products" className="notfound-btn">Browse Products</Link>
            </div>
        </div>
    );
}

export default NotFound;
