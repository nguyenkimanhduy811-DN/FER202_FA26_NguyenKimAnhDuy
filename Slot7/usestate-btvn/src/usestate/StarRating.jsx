import { useState } from 'react';

const LABELS = [
  '',
  'Rất tệ',
  'Tệ',
  'Bình thường',
  'Tốt',
  'Tuyệt vời'
];

function StarRating({ value, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0);

  const display = hovered || value;

  return (
    <div
      onMouseLeave={() => setHovered(0)}
      className="star-rating"
    >
      <div className="star-list">
        {Array.from(
          { length: max },
          (_, i) => i + 1
        ).map((star) => (
          <button
            type="button"
            key={star}
            className={
              star <= display
                ? 'star-button active'
                : 'star-button'
            }
            onMouseEnter={() => setHovered(star)}
            onClick={() =>
              onChange(star === value ? 0 : star)
            }
          >
            ★
          </button>
        ))}
      </div>

      <div className="star-label">
        {LABELS[display] || 'Chưa đánh giá'}
      </div>
    </div>
  );
}

export default StarRating;