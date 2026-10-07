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

import { validateRegister } from '../utils/validateRegister';

function ValidatedRegisterForm() {
  const [values, setValues] =
    useState(initialValues);

  const [touched, setTouched] =
    useState({});

  const [success, setSuccess] =
    useState('');

  const errors =
    validateRegister(values);

  const isValid =
    Object.keys(errors).length === 0;

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

    setSuccess('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  const showError = (name) => {
    return touched[name]
      ? errors[name]
      : undefined;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.keys(
      values
    ).reduce((result, name) => {
      result[name] = true;
      return result;
    }, {});

    setTouched(allTouched);

    if (!isValid) {
      return;
    }

    setSuccess(
      `Đăng ký thành công! Chào mừng ${values.fullName}`
    );

    setValues(initialValues);
    setTouched({});
  };

  return (
    <div className="validated-register-page">
      <div className="validated-register-container">

        <div className="validated-register-heading">
          <h1>Đăng ký tài khoản</h1>

          <p>
            Validation với touched, onBlur và Regex
          </p>
        </div>

        {success && (
          <Alert variant="success">
            {success}
          </Alert>
        )}

        <Card className="validated-register-card shadow-sm">
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
                  onBlur={handleBlur}
                  error={showError(field.id)}
                  helpText={field.helpText}
                />
              ))}

              {/* Giới tính */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Giới tính
                </Form.Label>

                {['Nam', 'Nữ'].map((gender) => (
                  <Form.Check
                    key={gender}
                    inline
                    type="radio"
                    name="gender"
                    value={gender}
                    label={gender}
                    checked={
                      values.gender === gender
                    }
                    onChange={handleChange}
                  />
                ))}
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
                  onBlur={handleBlur}
                  isInvalid={Boolean(
                    showError('major')
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
                  {showError('major')}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Checkbox */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  name="agree"
                  label="Tôi đồng ý với các điều khoản"
                  checked={values.agree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(
                    showError('agree')
                  )}
                  feedback={showError('agree')}
                  feedbackType="invalid"
                />
              </Form.Group>

              <div className="validated-register-actions">
                <Button
                  type="submit"
                  variant="primary"
                >
                  Đăng ký
                </Button>

                <div
                  className={
                    isValid
                      ? 'validation-status valid'
                      : 'validation-status'
                  }
                >
                  {isValid
                    ? 'Thông tin hợp lệ'
                    : `Còn ${
                        Object.keys(errors).length
                      } mục chưa hợp lệ`}
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ValidatedRegisterForm;