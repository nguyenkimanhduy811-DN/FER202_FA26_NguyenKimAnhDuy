
import { useState } from "react";
import postApi from "../api/postApi";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

function PatchPost() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handlePatch = async () => {
    const newTitle = title.trim();
    if (!newTitle) return;

    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await postApi.patch(1, {
        title: newTitle,
      });

      setResult({
        status: response.status,
        data: response.data,
      });
    } catch (err) {
      setError(err.userMessage || "Không thể cập nhật tiêu đề");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-4">
      <h2>PATCH – Sửa tiêu đề bài viết #1</h2>

      <Card>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề mới</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề mới"
            />
          </Form.Group>

          <Button
            onClick={handlePatch}
            disabled={!title.trim() || saving}
          >
            {saving ? "Đang lưu..." : "Cập nhật (PATCH)"}
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

export default PatchPost;
