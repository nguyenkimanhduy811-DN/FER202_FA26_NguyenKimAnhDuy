
import { useState } from "react";
import postApi from "../api/postApi";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await postApi.create({
        title,
        body,
        userId: 1,
      });

      setResult({
        status: response.status,
        data: response.data,
      });

      setTitle("");
      setBody("");
    } catch (err) {
      setError(err.userMessage || "Không thể tạo bài viết");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <h2>POST – Tạo bài viết</h2>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body"
                required
              />
            </Form.Group>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Đang gửi..." : "Tạo bài viết"}
            </Button>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              Error: {error}
            </Alert>
          )}

          {result && (
            <Alert variant="success" className="mt-3">
              <p>Status: {result.status}</p>
              <pre className="response-json">
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
