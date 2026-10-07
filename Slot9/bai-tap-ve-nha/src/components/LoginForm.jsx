import { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

import {
  initialLoginState,
  loginReducer,
  validateLogin
} from '../reducers/loginReducer';

import { DEMO_LOGIN } from '../data/loginData';

function fakeLoginApi(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        values.email.trim() ===
          DEMO_LOGIN.email &&
        values.password ===
          DEMO_LOGIN.password
      ) {
        resolve({
          email: values.email.trim()
        });
      } else {
        reject(
          new Error(
            'Email hoặc mật khẩu không đúng'
          )
        );
      }
    }, 1000);
  });
}

function LoginForm({
  onLoginSuccess
}) {
  const [state, dispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const {
    values,
    errors,
    touched,
    status,
    message
  } = state;

  const isSubmitting =
    status === 'submitting';

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        name,
        value:
          type === 'checkbox'
            ? checked
            : value
      }
    });
  };

  const handleBlur = (e) => {
    dispatch({
      type: 'BLUR_FIELD',
      payload: {
        name: e.target.name
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({
      type: 'SUBMIT'
    });

    const submitErrors =
      validateLogin(values);

    if (Object.keys(submitErrors).length > 0) {
      return;
    }

    try {
      const result =
        await fakeLoginApi(values);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: `Xin chào ${result.email}!`
      });

      onLoginSuccess?.(result);
    } catch {
      dispatch({
        type: 'LOGIN_FAILURE'
      });
    }
  };

  if (status === 'success') {
    return (
      <div className="login-page">
        <Card className="login-card shadow-sm">
          <Card.Body className="p-4">
            <Alert
              variant="success"
              className="mb-3"
            >
              {message}
            </Alert>

            <Button
              variant="primary"
              className="w-100"
              onClick={() =>
                dispatch({
                  type: 'RESET'
                })
              }
            >
              Đăng nhập lại
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="login-page">
      <Card className="login-card shadow-sm">
        <Card.Body className="p-4">
          <div className="login-heading">
            <h1>Đăng nhập</h1>

            <p>
              Đăng nhập vào tài khoản của bạn
            </p>
          </div>

          {status === 'error' && (
            <Alert
              variant="danger"
              className="mb-3"
            >
              {message}
            </Alert>
          )}

          <Form
            noValidate
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                isInvalid={
                  touched.email &&
                  Boolean(errors.email)
                }
                isValid={
                  touched.email &&
                  !errors.email &&
                  Boolean(values.email)
                }
                placeholder="Nhập email"
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Mật khẩu
              </Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                isInvalid={
                  touched.password &&
                  Boolean(errors.password)
                }
                isValid={
                  touched.password &&
                  !errors.password &&
                  Boolean(values.password)
                }
                placeholder="Nhập mật khẩu"
              />

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              type="checkbox"
              name="remember"
              label="Ghi nhớ đăng nhập"
              checked={values.remember}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mb-4"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </Form>

          <div className="demo-account">
            <strong>Tài khoản demo</strong>

            <div>
              Email: {DEMO_LOGIN.email}
            </div>

            <div>
              Mật khẩu: {DEMO_LOGIN.password}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginForm;