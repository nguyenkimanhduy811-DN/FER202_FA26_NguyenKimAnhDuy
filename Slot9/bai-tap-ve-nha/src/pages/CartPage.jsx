import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

function CartPage({ onNavigate }) {
  const {
    cart,
    dispatch
  } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="empty-page">
        <Alert variant="info">
          Giỏ hàng đang trống
        </Alert>

        <Button
          variant="primary"
          onClick={() =>
            onNavigate('shop')
          }
        >
          Tiếp tục mua sắm
        </Button>
      </div>
    );
  }

  return (
    <div>
      <CartSummary
        cart={cart}
        dispatch={dispatch}
      />

      <div className="checkout-button-wrapper">
        <Button
          variant="success"
          onClick={() =>
            onNavigate('checkout')
          }
        >
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
}

export default CartPage;