import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function QuantityPicker({
  min = 1,
  max = 10
}) {
  const [quantity, setQuantity] = useState(min);

  const decrease = () => {
    setQuantity((q) => Math.max(q - 1, min));
  };

  const increase = () => {
    setQuantity((q) => Math.min(q + 1, max));
  };

  const addThreeWrong = () => {
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
  };

  const addThree = () => {
    increase();
    increase();
    increase();
  };

  return (
    <div className="quantity-picker">
      <div className="quantity-picker-title">
        Số lượng
      </div>

      <ButtonGroup>
        <Button
          variant="outline-secondary"
          onClick={decrease}
          disabled={quantity <= min}
          aria-label="Giảm số lượng"
        >
          −
        </Button>

        <span className="quantity-value">
          {quantity}
        </span>

        <Button
          variant="outline-primary"
          onClick={increase}
          disabled={quantity >= max}
          aria-label="Tăng số lượng"
        >
          +
        </Button>
      </ButtonGroup>

      {quantity === max && (
        <small className="quantity-warning">
          Tối đa {max} sản phẩm
        </small>
      )}

      <div className="quantity-test-buttons">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={addThreeWrong}
        >
          +3 (sai)
        </Button>

        <Button
          variant="outline-success"
          size="sm"
          onClick={addThree}
        >
          +3 (đúng)
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setQuantity(min)}
        >
          Đặt lại
        </Button>
      </div>
    </div>
  );
}

export default QuantityPicker;