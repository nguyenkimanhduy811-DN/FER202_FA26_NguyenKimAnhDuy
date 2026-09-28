import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const sampleTexts = [
  'Hello world',
  'I love React',
  'React is easy',
  'Learning JavaScript'
];

function ControlledInput() {
  const [text, setText] = useState('');
  const [sampleIndex, setSampleIndex] = useState(0);

  const sampleText = sampleTexts[sampleIndex];

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleReset = () => {
    setText('');
  };

  const handleNew = () => {
    const nextIndex =
      (sampleIndex + 1) % sampleTexts.length;

    setSampleIndex(nextIndex);
    setText('');
  };

  const isCorrect =
    text.length > 0 && sampleText.startsWith(text);

  const isFinished = text === sampleText;

  return (
    <Card
      className="shadow mx-auto"
      style={{ maxWidth: '600px' }}
    >
      <Card.Body className="p-4">
        <Card.Title className="text-center mb-4">
          Typing Test
        </Card.Title>

        {/* Ô nhập */}
        <Form.Control
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Type here..."
          className="mb-3"
        />

        {/* Câu mẫu */}
        <div className="border rounded p-3 bg-light mb-3">
          <strong>Sample:</strong>
          <div className="mt-2">
            {sampleText}
          </div>
        </div>

        {/* Trạng thái */}
        {isFinished ? (
          <div className="text-success fw-bold mb-3">
            ✓ Correct!
          </div>
        ) : text.length > 0 && !isCorrect ? (
          <div className="text-danger fw-bold mb-3">
            ✗ Wrong!
          </div>
        ) : (
          <div className="text-muted mb-3">
            ...
          </div>
        )}

        {/* Nút */}
        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            onClick={handleNew}
          >
            New
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ControlledInput;