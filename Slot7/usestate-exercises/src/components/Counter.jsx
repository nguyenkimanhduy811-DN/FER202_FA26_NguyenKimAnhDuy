import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <Card
      className="shadow mx-auto"
      style={{ maxWidth: '450px' }}
    >
      <Card.Body className="text-center p-5">
        <Card.Title className="fs-2 mb-4">
          Counter
        </Card.Title>

        <div className="border rounded bg-light py-4 mb-4">
          <div className="text-muted mb-2">
            Current number
          </div>

          <div className="display-3 fw-bold text-primary">
            {count}
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="danger"
            onClick={handleDecrease}
          >
            −
          </Button>

          <Button
            variant="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            variant="success"
            onClick={handleIncrease}
          >
            +
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Counter;