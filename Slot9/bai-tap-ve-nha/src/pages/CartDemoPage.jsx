import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';

import ProductList from '../components/ProductList';
import CartSummary from '../components/CartSummary';

import { products } from '../data/products';

import {
  cartReducer,
  initialCart,
  CART_ACTIONS
} from '../reducers/cartReducer';

function CartDemoPage() {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  const handleAddToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product
    });
  };

  return (
    <div className="cart-demo-page">
      <div className="cart-demo-container">
        <div className="cart-demo-heading">
          <h1>Giỏ hàng với useReducer</h1>

          <p>
            Quản lý sản phẩm bằng reducer thuần
          </p>
        </div>

        <div className="cart-demo-grid">
          <Card className="products-card shadow-sm">
            <Card.Body>
              <h2 className="section-title">
                Sản phẩm
              </h2>

              <ProductList
                products={products}
                onAddToCart={handleAddToCart}
              />
            </Card.Body>
          </Card>

          <CartSummary
            cart={cart}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
}

export default CartDemoPage;