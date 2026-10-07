import { useState } from 'react';

import './App.css';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Layout from './components/Layout';

import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';

function AppContent() {
  const [page, setPage] = useState('shop');

  return (
    <Layout
      currentPage={page}
      onNavigate={setPage}
    >
      {page === 'shop' && (
        <ShopPage />
      )}

      {page === 'cart' && (
        <CartPage
          onNavigate={setPage}
        />
      )}

      {page === 'checkout' && (
        <CheckoutPage
          onNavigate={setPage}
        />
      )}

      {page === 'login' && (
        <LoginPage
          onNavigate={setPage}
        />
      )}
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}