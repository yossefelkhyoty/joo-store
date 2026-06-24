import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './context';

const CART_KEY = 'joo-store-cart';
const USER_KEY = 'user';
const USERS_KEY = 'registeredUsers';

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadUser() {
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);
  const [user, setUser] = useState(loadUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback(productId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleSearch = useCallback(
    term => {
      setSearchTerm(term);
      if (term.trim()) {
        navigate('/products');
      }
    },
    [navigate]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const login = useCallback(({ email, password }) => {
    const registered = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const match = registered.find(u => u.email === email && u.password === password);

    if (!match) {
      return { success: false, error: 'Invalid email or password. Please register first.' };
    }

    const session = { email: match.email, name: match.name, loggedIn: true };
    localStorage.setItem(USER_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }, []);

  const register = useCallback(({ name, email, password }) => {
    const registered = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    if (registered.some(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = { name, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...registered, newUser]));

    const session = { email, name, loggedIn: true };
    localStorage.setItem(USER_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    cartItemsCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    searchTerm,
    handleSearch,
    clearSearch,
    user,
    isLoggedIn: Boolean(user?.loggedIn),
    login,
    register,
    logout,
    toast,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
