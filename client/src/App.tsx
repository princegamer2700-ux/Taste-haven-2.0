import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Navbar from './components/PremiumNavbar';
import Footer from './components/PremiumFooter';
import { CartProvider } from './context/CartContext';
import './index.css';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-[#16213e] text-white">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;