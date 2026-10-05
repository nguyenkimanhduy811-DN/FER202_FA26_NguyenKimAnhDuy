import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {
  useCart,
  useCartDispatch
} from '../contexts/CartContext';

export default function Cart() {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  if (items.length === 0) {
    return (
      <Card className="cart-card shadow-sm">
        <Card.Body className="text-center py-4">
          <div className="cart-empty">
            🛒
          </div>

          <p className="mb-0 text-muted">
            Giỏ hàng trống.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="cart-card shadow-sm">
      <Card.Body className="p-4">
        <h3 className="cart-title">
          Giỏ hàng
        </h3>

        <div className="cart-list">
          {items.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <div className="cart-item-info">
                <div className="cart-item-name">
                  {item.name}
                </div>

                <div className="cart-item-price">
                  {item.price.toLocaleString(
                    'vi-VN'
                  )}đ
                </div>
              </div>

              <div className="cart-item-actions">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      type: 'DECREASE',
                      payload: item.id
                    })
                  }
                >
                  −
                </Button>

                <span className="cart-qty">
                  {item.qty}
                </span>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      type: 'ADD',
                      payload: item
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
                      type: 'REMOVE',
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

        <div className="cart-footer">
          <div>
            <span className="cart-total-label">
              Tổng tiền
            </span>

            <strong className="cart-total">
              {total.toLocaleString('vi-VN')}đ
            </strong>
          </div>

          <Button
            variant="danger"
            onClick={() =>
              dispatch({
                type: 'CLEAR'
              })
            }
          >
            Xóa hết
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}