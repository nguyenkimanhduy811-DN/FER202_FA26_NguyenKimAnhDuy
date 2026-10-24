
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import postApi from "../../api/postApi";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";
import ResultBox from "./ResultBox";

const POST_ID = 1;

export default function UpdatePostCard() {
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await postApi.getById(
          POST_ID,
          controller.signal
        );
        setForm(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.userMessage || "Không thể tải bài viết");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const handleUpdate = async () => {
    if (!form) return;

    const validationErrors = {};

    if (form.title.trim().length < 5) {
      validationErrors.title = "Tiêu đề tối thiểu 5 ký tự";
    }

    if (form.body.trim().length < 10) {
      validationErrors.body = "Nội dung tối thiểu 10 ký tự";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    setSaveError(null);
    setResult(null);

    try {
      const res = await postApi.update(POST_ID, {
        id: form.id,
        userId: form.userId,
        title: form.title.trim(),
        body: form.body.trim(),
      });

      setResult({
        status: res.status,
        duration: res.duration,
        data: res.data,
      });
    } catch (err) {
      setSaveError(err.userMessage || "Không thể cập nhật bài viết");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.3 · PUT</strong> /posts/{POST_ID}
      </Card.Header>

      <Card.Body>
        {loading && <LoadingSpinner />}

        {!loading && error && <ErrorAlert message={error} />}

        {!loading && form && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={form.title}
                isInvalid={!!errors.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
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
                value={form.body}
                isInvalid={!!errors.body}
                onChange={(e) =>
                  setForm({ ...form, body: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.body}
              </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={handleUpdate} disabled={saving}>
              {saving ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Đang lưu...
                </>
              ) : (
                "Cập nhật (PUT)"
              )}
            </Button>
          </>
        )}

        {saveError && (
          <Alert variant="danger" className="mt-3 mb-0">
            {saveError}
          </Alert>
        )}

        <ResultBox result={result} />
      </Card.Body>
    </Card>
  );
}
