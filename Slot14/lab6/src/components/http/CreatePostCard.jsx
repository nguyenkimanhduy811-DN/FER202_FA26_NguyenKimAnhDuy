
import { useState } from "react";
import {
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import postApi from "../../api/postApi";
import ResultBox from "./ResultBox";

export default function CreatePostCard() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (title.trim().length < 5) {
      validationErrors.title = "Tiêu đề tối thiểu 5 ký tự";
    }

    if (body.trim().length < 10) {
      validationErrors.body = "Nội dung tối thiểu 10 ký tự";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const res = await postApi.create({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });

      setResult({
        status: res.status,
        duration: res.duration,
        data: res.data,
      });

      setTitle("");
      setBody("");
      setErrors({});
    } catch (err) {
      setError(err.userMessage || "Không thể tạo bài viết");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.2 · POST</strong> /posts
      </Card.Header>

      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              placeholder="Nhập tiêu đề"
              isInvalid={!!errors.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={body}
              placeholder="Nhập nội dung"
              isInvalid={!!errors.body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner size="sm" className="me-2" />
                Đang gửi...
              </>
            ) : (
              "Tạo bài viết"
            )}
          </Button>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3 mb-0">
            {error}
          </Alert>
        )}

        <ResultBox result={result} />
      </Card.Body>
    </Card>
  );
}
