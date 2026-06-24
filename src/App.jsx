import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider } from './context/AppContext'
import { useApp } from './context/useApp'
import Proudcts from './Proudcts'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import ProductPage from './ProductPage'
import Cart from './Cart'
import Checkout from './Checkout'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import Toast from './components/Toast'

function AppContent() {
  const { toast } = useApp();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products' element={<Proudcts />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
      <Toast message={toast?.message} type={toast?.type} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename="/joo-store">
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
