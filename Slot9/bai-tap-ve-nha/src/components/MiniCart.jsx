import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { cartItems } from '../data/cart';
import { formatVND } from '../utils/format';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

function MiniCart() {
  const [items, setItems] = useState(cartItems);

  const changeQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                Math.max(
                  MIN_QUANTITY,
                  item.quantity + delta
                )
              )
            }
          : item
      )
    );
  };

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="mini-cart">
      <div className="mini-cart-header">
        <div>
          <h2>Giỏ hàng mini</h2>
          <p>Điều chỉnh số lượng từng sản phẩm</p>
        </div>

        <span className="cart-count">
          {totalQuantity} sản phẩm
        </span>
      </div>

      <Table
        bordered
        hover
        responsive
        className="cart-table"
      >
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="product-name">
                {item.name}
              </td>

              <td>
                {formatVND(item.price)}
              </td>

              <td>
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      changeQuantity(item.id, -1)
                    }
                    disabled={
                      item.quantity <= MIN_QUANTITY
                    }
                    aria-label={`Giảm ${item.name}`}
                  >
                    −
                  </Button>

                  <span className="cart-quantity">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      changeQuantity(item.id, 1)
                    }
                    disabled={
                      item.quantity >= MAX_QUANTITY
                    }
                    aria-label={`Tăng ${item.name}`}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>

              <td className="item-total">
                {formatVND(
                  item.price * item.quantity
                )}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th colSpan={2}>Tổng cộng</th>
            <th>{totalQuantity}</th>
            <th className="cart-total">
              {formatVND(totalPrice)}
            </th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default MiniCart;