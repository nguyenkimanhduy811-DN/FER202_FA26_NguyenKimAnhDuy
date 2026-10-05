import { CartProvider } from './contexts/CartContext';
import CartBadge from './components/CartBadge';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function App() {
  return (
    <CartProvider>
      <div className="cart-app">
        <header className="cart-header">
          <h1>My Shop</h1>
          <CartBadge />
        </header>

        <ProductList />

        <hr />

        <Cart />
      </div>
    </CartProvider>
  );
}