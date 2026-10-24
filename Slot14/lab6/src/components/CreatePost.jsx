
import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);
    setResult(null);

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: title,
        body: body,
        userId: 1,
      })
      .then((response) => {
        setResult({
          status: response.status,
          data: response.data,
        });

        setTitle("");
        setBody("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container className="py-4">
      <h2 className="text-primary fw-bold mb-3">
        Bài 2.2 – POST tạo bài viết
      </h2>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Title</Form.Label>

              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề bài viết"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postBody">
              <Form.Label>Body</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Nhập nội dung bài viết"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? "Đang gửi..." : "Tạo bài viết"}
            </Button>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-4 mb-0">
              Lỗi: {error}
            </Alert>
          )}

          {result && (
            <Alert variant="success" className="mt-4 mb-0">
              <h5>Gửi bài viết thành công!</h5>

              <p className="mb-2">
                Status: {result.status}
              </p>

              <pre className="response-json mb-0">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreatePost;
