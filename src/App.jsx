import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useState } from 'react'
import Proudcts from './Proudcts'
import Navbar from './Navbar'
import Home from './Home'
import About from './About' 
import Contact from './Contact'
import ProductPage from './ProductPage'
import Cart from './Cart'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'

// Create a separate component for the app content
function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Now this is inside BrowserRouter

  // Check if user is logged in
  const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).loggedIn : false;
  };

  // Handle search function with automatic navigation
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Navigate to products page when searching
    if (term.trim() && window.location.pathname !== '/products') {
      navigate('/products');
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Update product quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  return (
    <>
      <Navbar 
        cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onSearch={handleSearch}
        isLoggedIn={isLoggedIn()}
      />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/products' element={
          <Proudcts searchTerm={searchTerm} />
        }/>
        <Route path='/product/:id' element={
          <ProductPage addToCart={addToCart} />
        }/>
        <Route path='/cart' element={
          <Cart 
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

// Main App component
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App