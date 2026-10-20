
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

  // 1. GET bài viết số 1 khi component được mount.
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 2. PUT toàn bộ bài viết sau khi người dùng chỉnh sửa.
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
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải bài viết...</p>
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
      <h2 className="text-primary fw-bold mb-3">
        Bài 2.3 – PUT cập nhật bài viết
      </h2>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <p className="text-muted">
            Chỉnh sửa tiêu đề và nội dung bài viết #{post.id}.
          </p>

          <Form.Group className="mb-3" controlId="updatePostTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={post.title}
              onChange={(e) => {
                setPost({ ...post, title: e.target.value });
                setResult(null);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="updatePostBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={post.body}
              onChange={(e) => {
                setPost({ ...post, body: e.target.value });
                setResult(null);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? "Đang cập nhật..." : "Cập nhật (PUT)"}
          </Button>

          {error && (
            <Alert variant="danger" className="mt-3">
              Lỗi khi cập nhật: {error}
            </Alert>
          )}

          {result && (
            <Alert variant="success" className="mt-4 mb-0">
              <h5>Cập nhật thành công!</h5>
              <p>Status: {result.status}</p>
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

export default UpdatePost;
