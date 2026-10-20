
import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";

const URL = "https://jsonplaceholder.typicode.com/posts/1";

function PatchPost() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePatch = () => {
    const newTitle = title.trim();

    if (!newTitle) return;

    setSubmitting(true);
    setError(null);
    setResult(null);

    axios
      .patch(URL, {
        title: newTitle,
      })
      .then((response) => {
        setResult({
          status: response.status,
          data: response.data,
        });
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
        Bài 2.4 – PATCH sửa tiêu đề bài viết #1
      </h2>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Form.Group className="mb-3" controlId="patchTitle">
            <Form.Label>Tiêu đề mới</Form.Label>

            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề muốn cập nhật"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setResult(null);
                setError(null);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handlePatch}
            disabled={!title.trim() || submitting}
          >
            {submitting ? "Đang cập nhật..." : "Cập nhật (PATCH)"}
          </Button>

          {error && (
            <Alert variant="danger" className="mt-3 mb-0">
              Lỗi: {error}
            </Alert>
          )}

          {result && (
            <Alert variant="success" className="mt-3 mb-0">
              <h5>Cập nhật thành công!</h5>

              <p>
                <strong>Status:</strong> {result.status}
              </p>

              <p>
                <strong>Tiêu đề mới:</strong> {result.data.title}
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

export default PatchPost;
