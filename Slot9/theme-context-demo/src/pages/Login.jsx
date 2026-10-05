import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (login(form.username, form.password)) {
      navigate('/dashboard');
    } else {
      setError('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card shadow-sm">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h1 className="auth-title">
              Đăng nhập
            </h1>

            <p className="text-muted mb-0">
              Đăng nhập vào tài khoản của bạn
            </p>
          </div>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Username
              </Form.Label>

              <Form.Control
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Nhập username"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Password
              </Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Nhập password"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
            >
              Đăng nhập
            </Button>
          </Form>

          <div className="login-demo mt-4">
            <div className="fw-semibold mb-1">
              Tài khoản demo
            </div>

            <div>
              Username: <strong>admin</strong>
            </div>

            <div>
              Password: <strong>123</strong>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}