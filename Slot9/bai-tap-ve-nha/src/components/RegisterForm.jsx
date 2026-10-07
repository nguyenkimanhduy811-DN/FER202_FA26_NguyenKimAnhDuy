import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import InputField from './InputField';

import {
  fields,
  initialValues
} from '../data/registerData';

const REQUIRED_MESSAGES = {
  fullName: 'Vui lòng nhập họ và tên',
  email: 'Vui lòng nhập email',
  password: 'Vui lòng nhập mật khẩu',
  confirmPassword:
    'Vui lòng nhập lại mật khẩu',
  major: 'Vui lòng chọn chuyên ngành',
  agree: 'Bạn cần đồng ý điều khoản'
};

function validate(values) {
  const errors = {};

  Object.entries(REQUIRED_MESSAGES).forEach(
    ([name, message]) => {
      if (name === 'agree') {
        if (!values.agree) {
          errors[name] = message;
        }

        return;
      }

      if (
        typeof values[name] === 'string' &&
        !values[name].trim()
      ) {
        errors[name] = message;
      }
    }
  );

  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword =
      'Mật khẩu nhập lại không khớp';
  }

  return errors;
}

function RegisterForm() {
  const [values, setValues] =
    useState(initialValues);

  const [errors, setErrors] =
    useState({});

  const [submitted, setSubmitted] =
    useState(null);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length > 0
    ) {
      setSubmitted(null);
      return;
    }

    setSubmitted(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-heading">
          <h1>Đăng ký tài khoản</h1>
          <p>
            Thực hành controlled form với useState
          </p>
        </div>

        {submitted && (
          <Alert variant="success">
            <div className="fw-bold mb-2">
              Đã nhận đăng ký của{' '}
              {submitted.fullName}
            </div>

            <pre className="submitted-json">
              {JSON.stringify(
                submitted,
                null,
                2
              )}
            </pre>
          </Alert>
        )}

        <Card className="register-card shadow-sm">
          <Card.Body className="p-4">
            <Form
              noValidate
              onSubmit={handleSubmit}
            >
              {fields.map((field) => (
                <InputField
                  key={field.id}
                  name={field.id}
                  label={field.label}
                  type={field.type}
                  required={field.required}
                  value={values[field.id]}
                  onChange={handleChange}
                  error={errors[field.id]}
                  helpText={field.helpText}
                />
              ))}

              {/* Giới tính */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Giới tính
                </Form.Label>

                {['Nam', 'Nữ'].map(
                  (gender) => (
                    <Form.Check
                      key={gender}
                      inline
                      type="radio"
                      name="gender"
                      value={gender}
                      label={gender}
                      checked={
                        values.gender ===
                        gender
                      }
                      onChange={handleChange}
                    />
                  )
                )}
              </Form.Group>

              {/* Chuyên ngành */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Chuyên ngành
                </Form.Label>

                <Form.Select
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  isInvalid={Boolean(
                    errors.major
                  )}
                >
                  <option value="">
                    -- Chọn chuyên ngành --
                  </option>

                  <option value="Software Engineering">
                    Software Engineering
                  </option>

                  <option value="Information Technology">
                    Information Technology
                  </option>

                  <option value="Computer Science">
                    Computer Science
                  </option>

                  <option value="Data Science">
                    Data Science
                  </option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.major}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Đồng ý điều khoản */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  name="agree"
                  label="Tôi đồng ý với các điều khoản"
                  checked={values.agree}
                  onChange={handleChange}
                  isInvalid={Boolean(
                    errors.agree
                  )}
                  feedback={errors.agree}
                  feedbackType="invalid"
                />
              </Form.Group>

              <div className="register-actions">
                <Button
                  type="submit"
                  variant="primary"
                >
                  Đăng ký
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={handleReset}
                >
                  Làm lại
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

      </div>
    </div>
  );
}

export default RegisterForm;