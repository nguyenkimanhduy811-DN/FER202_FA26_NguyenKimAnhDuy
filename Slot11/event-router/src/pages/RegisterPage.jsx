import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    session: "Sáng",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) {
      setError("Vui lòng nhập họ tên.");
      return;
    }

    if (!email.includes("@")) {
      setError("Email phải chứa ký tự @.");
      return;
    }

    const formData = {
      name,
      email,
      session: form.session,
    };

    navigate("/success", {
      state: formData,
      replace: true,
    });
  };

  return (
    <Container className="py-5">
      <Card className="form-card shadow-sm">
        <Card.Body className="p-4">
          <h1 className="page-title mb-2">
            Đăng ký tham dự
          </h1>

          <p className="text-muted mb-4">
            FPTU Tech Day 2026
          </p>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Họ tên</Form.Label>

              <Form.Control
                type="text"
                name="name"
                placeholder="Nhập họ tên của bạn"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="text"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="session">
              <Form.Label>Buổi tham dự</Form.Label>

              <Form.Select
                name="session"
                value={form.session}
                onChange={handleChange}
              >
                <option value="Sáng">Buổi sáng</option>
                <option value="Chiều">Buổi chiều</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>

              <Button type="submit" variant="primary">
                Gửi đăng ký
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;