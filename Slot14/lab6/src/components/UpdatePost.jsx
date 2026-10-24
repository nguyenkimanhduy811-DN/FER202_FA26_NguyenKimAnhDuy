import { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Spinner,
} from "react-bootstrap";

const URL = "https://jsonplaceholder.typicode.com/posts/1";

function UpdatePost() {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(URL);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleUpdate = async () => {
    if (!post) return;

    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.put(URL, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      });

      setResult({
        status: response.status,
        data: response.data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <Spinner animation="border" size="sm" /> Loading...
      </Container>
    );
  }

  if (error && !post) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  if (!post) return null;

  return (
    <Container className="py-4">
      <h2>PUT – Cập nhật bài viết #{post.id}</h2>

      <Card>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={post.title}
              onChange={(e) =>
                setPost({ ...post, title: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={post.body}
              onChange={(e) =>
                setPost({ ...post, body: e.target.value })
              }
            />
          </Form.Group>

          <Button onClick={handleUpdate} disabled={saving}>
            {saving ? "Đang lưu..." : "Cập nhật (PUT)"}
          </Button>

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

export default UpdatePost;