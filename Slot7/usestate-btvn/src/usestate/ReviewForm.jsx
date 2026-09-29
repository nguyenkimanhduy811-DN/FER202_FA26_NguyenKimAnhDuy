import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import StarRating from './StarRating';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const canSubmit =
    rating > 0 &&
    comment.trim().length >= 5;

  const average =
    reviews.length === 0
      ? '0.0'
      : (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setReviews((prev) => [
      {
        id: Date.now(),
        rating,
        comment: comment.trim()
      },
      ...prev
    ]);

    setRating(0);
    setComment('');
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <h1 className="text-center mb-2">
          Đánh giá sản phẩm
        </h1>

        <p className="text-center text-muted mb-4">
          Trung bình {average}/5 ({reviews.length} lượt)
        </p>

        <Card className="shadow-sm mb-4">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Chọn số sao
                </Form.Label>

                <StarRating
                  value={rating}
                  onChange={setRating}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Nhận xét
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={4}
                  value={comment}
                  onChange={(event) =>
                    setComment(event.target.value)
                  }
                  placeholder="Nhập ít nhất 5 ký tự..."
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                disabled={!canSubmit}
              >
                Gửi đánh giá
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div>
          {reviews.map((review) => (
            <Card
              className="shadow-sm mb-3"
              key={review.id}
            >
              <Card.Body>
                <div className="review-stars">
                  <span className="text-warning">
                    {'★'.repeat(review.rating)}
                  </span>

                  <span className="text-secondary">
                    {'★'.repeat(5 - review.rating)}
                  </span>
                </div>

                <p className="mb-0 mt-2">
                  {review.comment}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;