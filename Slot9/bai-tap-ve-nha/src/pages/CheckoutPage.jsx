import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import InputField from '../components/InputField';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import { formatVND } from '../utils/format';
import { validateCheckout } from '../utils/validateCheckout';

const initialCheckoutValues = {
  receiver: '',
  phone: '',
  address: '',
  payment: '',
  note: ''
};

const SHIPPING_FEE = 30000;

function CheckoutPage({
  onNavigate
}) {
  const { user } = useAuth();

  const {
    cart,
    totalQuantity,
    totalPrice,
    clearCart
  } = useCart();

  const [values, setValues] = useState({
    ...initialCheckoutValues,
    receiver: user?.name ?? ''
  });

  const [submitted, setSubmitted] =
    useState(false);

  const [order, setOrder] = useState(null);

  const errors =
    validateCheckout(values);

  const errorOf = (name) => {
    return submitted
      ? errors[name]
      : undefined;
  };

  const shippingFee =
    totalPrice >= 1000000
      ? 0
      : SHIPPING_FEE;

  const grandTotal =
    totalPrice + shippingFee;

  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e) => {
    setValues((prev) => ({
      ...prev,
      payment: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (
      Object.keys(errors).length > 0
    ) {
      return;
    }

    const newOrder = {
      code: `DH${Date.now()
        .toString()
        .slice(-6)}`,
      receiver: values.receiver.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      payment: values.payment,
      note: values.note.trim(),
      totalQuantity,
      totalPrice,
      shippingFee,
      grandTotal
    };

    setOrder(newOrder);
    clearCart();
  };

  if (order) {
    return (
      <div className="checkout-success">
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <Alert variant="success">
              Đặt hàng thành công!
            </Alert>

            <div className="order-info">
              <p>
                <strong>Mã đơn:</strong>{' '}
                {order.code}
              </p>

              <p>
                <strong>Người nhận:</strong>{' '}
                {order.receiver}
              </p>

              <p>
                <strong>Tổng thanh toán:</strong>{' '}
                {formatVND(order.grandTotal)}
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() =>
                onNavigate('shop')
              }
            >
              Tiếp tục mua sắm
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

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
          Quay lại cửa hàng
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout-grid">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="section-title">
            Thông tin giao hàng
          </h2>

          <Form
            noValidate
            onSubmit={handleSubmit}
          >
            <InputField
              name="receiver"
              label="Người nhận"
              type="text"
              value={values.receiver}
              onChange={handleChange}
              error={errorOf('receiver')}
            />

            <InputField
              name="phone"
              label="Số điện thoại"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              error={errorOf('phone')}
            />

            <InputField
              name="address"
              label="Địa chỉ"
              as="textarea"
              rows={2}
              value={values.address}
              onChange={handleChange}
              error={errorOf('address')}
            />

            <Form.Group className="mb-3">
              <Form.Label>
                Phương thức thanh toán
              </Form.Label>

              {[
                'COD',
                'Chuyển khoản',
                'Ví điện tử'
              ].map((method) => (
                <Form.Check
                  key={method}
                  type="radio"
                  name="payment"
                  value={method}
                  label={method}
                  checked={
                    values.payment === method
                  }
                  onChange={
                    handlePaymentChange
                  }
                />
              ))}

              {errorOf('payment') && (
                <div className="text-danger small mt-2">
                  {errorOf('payment')}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Ghi chú
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={2}
                name="note"
                value={values.note}
                onChange={handleChange}
                placeholder="Ghi chú thêm..."
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100"
            >
              Đặt hàng
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="section-title">
            Tóm tắt đơn hàng
          </h2>

          {cart.items.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                {formatVND(
                  item.price * item.quantity
                )}
              </strong>
            </div>
          ))}

          <hr />

          <div className="summary-total-row">
            <span>
              Tiền hàng
            </span>

            <strong>
              {formatVND(totalPrice)}
            </strong>
          </div>

          <div className="summary-total-row">
            <span>
              Phí giao hàng
            </span>

            <strong>
              {shippingFee === 0
                ? 'Miễn phí'
                : formatVND(shippingFee)}
            </strong>
          </div>

          <div className="summary-total-row grand-total">
            <span>
              Tổng thanh toán
            </span>

            <strong>
              {formatVND(grandTotal)}
            </strong>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CheckoutPage;