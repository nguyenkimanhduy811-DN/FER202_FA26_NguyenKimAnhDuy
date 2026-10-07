import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

import {
  CART_ACTIONS,
  getCartTotals
} from '../reducers/cartReducer';

import { formatVND } from '../utils/format';

function CartSummary({ cart, dispatch }) {
  const { items } = cart;

  const {
    totalQuantity,
    totalPrice
  } = getCartTotals(cart);

  if (items.length === 0) {
    return (
      <Card className="cart-summary-card shadow-sm">
        <Card.Body>
          <div className="cart-summary-title">
            <h2>Giỏ hàng</h2>
            <Badge bg="primary">0</Badge>
          </div>

          <Alert variant="warning" className="mb-0">
            Giỏ hàng đang trống
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="cart-summary-card shadow-sm">
      <Card.Body>
        <div className="cart-summary-title">
          <h2>Giỏ hàng</h2>

          <Badge bg="primary">
            {totalQuantity}
          </Badge>
        </div>

        <div className="cart-items">
          {items.map((item) => (
            <div
              className="cart-row"
              key={item.id}
            >
              <div className="cart-item-info">
                <div className="cart-item-name">
                  {item.name}
                </div>

                <div className="cart-item-price">
                  {formatVND(item.price)}
                </div>
              </div>

              <div className="cart-item-controls">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      type: CART_ACTIONS.DECREASE,
                      payload: item.id
                    })
                  }
                >
                  −
                </Button>

                <span className="cart-item-quantity">
                  {item.quantity}
                </span>

                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={
                    item.quantity >= 10
                  }
                  onClick={() =>
                    dispatch({
                      type: CART_ACTIONS.INCREASE,
                      payload: item.id
                    })
                  }
                >
                  +
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      type: CART_ACTIONS.REMOVE,
                      payload: item.id
                    })
                  }
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total-row">
          <div>
            <div className="cart-total-label">
              Tổng cộng
            </div>

            <strong className="cart-total-price">
              {formatVND(totalPrice)}
            </strong>
          </div>

          <Button
            variant="danger"
            onClick={() =>
              dispatch({
                type: CART_ACTIONS.CLEAR
              })
            }
          >
            Xóa toàn bộ giỏ
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartSummary;