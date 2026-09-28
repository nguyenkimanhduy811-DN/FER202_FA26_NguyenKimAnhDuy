import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card
      className="shadow mx-auto"
      style={{ maxWidth: '500px' }}
    >
      <Card.Body className="text-center p-4">
        <Card.Title className="fs-2 mb-4">
          Toggle Visibility
        </Card.Title>

        {isVisible && (
          <div className="border rounded bg-light p-3 mb-4">
            Toggle me !
          </div>
        )}

        <Button
          variant={isVisible ? 'danger' : 'primary'}
          onClick={handleToggle}
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ToggleVisibility;