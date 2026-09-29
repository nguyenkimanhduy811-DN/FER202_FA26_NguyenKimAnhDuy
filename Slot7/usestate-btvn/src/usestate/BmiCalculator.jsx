import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function classify(bmi) {
  if (bmi < 18.5) {
    return {
      label: 'Thiếu cân',
      variant: 'info'
    };
  }

  if (bmi < 23) {
    return {
      label: 'Bình thường',
      variant: 'success'
    };
  }

  if (bmi < 25) {
    return {
      label: 'Thừa cân',
      variant: 'warning'
    };
  }

  return {
    label: 'Béo phì',
    variant: 'danger'
  };
}

function BmiCalculator() {
  // Chỉ có đúng 3 state theo yêu cầu
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm');

  // Giá trị của input type="number" vẫn là string
  const h = Number(height);
  const w = Number(weight);

  // Đổi chiều cao về mét để tính BMI
  const heightInMeter =
    unit === 'cm' ? h / 100 : h;

  const errors = {};

  // Chỉ kiểm tra khi ô không trống
  if (height !== '') {
    const validHeight =
      unit === 'cm'
        ? h >= 50 && h <= 250
        : h >= 0.5 && h <= 2.5;

    if (!validHeight) {
      errors.height =
        unit === 'cm'
          ? 'Chiều cao từ 50 đến 250 cm'
          : 'Chiều cao từ 0.5 đến 2.5 m';
    }
  }

  if (weight !== '') {
    const validWeight =
      w >= 10 && w <= 300;

    if (!validWeight) {
      errors.weight =
        'Cân nặng từ 10 đến 300 kg';
    }
  }

  // Dữ liệu tính toán là biến dẫn xuất
  const ready =
    height !== '' &&
    weight !== '' &&
    Object.keys(errors).length === 0;

  const bmi = ready
    ? w / (heightInMeter * heightInMeter)
    : null;

  const result = bmi !== null
    ? classify(bmi)
    : null;

  const changeUnit = (next) => {
    if (next === unit) {
      return;
    }

    if (height !== '') {
      const converted =
        next === 'cm'
          ? Number(height) * 100
          : Number(height) / 100;

      setHeight(String(converted));
    }

    setUnit(next);
  };

  return (
    <div className="bmi-page">
      <Card className="bmi-card shadow">
        <Card.Body>
          <div className="text-center mb-4">
            <h1 className="bmi-title">
              BMI Calculator
            </h1>

            <p className="text-muted mb-0">
              Nhập chiều cao và cân nặng để tính chỉ số BMI
            </p>
          </div>

          <Form>
            {/* Chiều cao */}
            <Form.Group className="mb-3">
              <Form.Label>Chiều cao</Form.Label>

              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  value={height}
                  onChange={(e) =>
                    setHeight(e.target.value)
                  }
                  placeholder={
                    unit === 'cm'
                      ? 'Ví dụ: 170'
                      : 'Ví dụ: 1.7'
                  }
                  isInvalid={!!errors.height}
                />

                <ButtonGroup>
                  <Button
                    variant={
                      unit === 'cm'
                        ? 'primary'
                        : 'outline-primary'
                    }
                    onClick={() =>
                      changeUnit('cm')
                    }
                    type="button"
                  >
                    cm
                  </Button>

                  <Button
                    variant={
                      unit === 'm'
                        ? 'primary'
                        : 'outline-primary'
                    }
                    onClick={() =>
                      changeUnit('m')
                    }
                    type="button"
                  >
                    m
                  </Button>
                </ButtonGroup>
              </div>

              {errors.height && (
                <Form.Control.Feedback
                  type="invalid"
                  className="d-block"
                >
                  {errors.height}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Cân nặng */}
            <Form.Group className="mb-4">
              <Form.Label>
                Cân nặng (kg)
              </Form.Label>

              <Form.Control
                type="number"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value)
                }
                placeholder="Ví dụ: 65"
                isInvalid={!!errors.weight}
              />

              {errors.weight && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Kết quả */}
            {result ? (
              <Alert
                variant={result.variant}
                className="bmi-result"
              >
                <div className="bmi-number">
                  BMI = {bmi.toFixed(1)}
                </div>

                <div className="bmi-label">
                  → {result.label}
                </div>
              </Alert>
            ) : (
              <div className="bmi-guide">
                Nhập chiều cao và cân nặng hợp lệ để xem kết quả.
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BmiCalculator;