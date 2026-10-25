
import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import postApi from "../../api/postApi";
import ResultBox from "./ResultBox";

const POST_ID = 1;

export default function UpdatePostCard() {
  // GET bài viết bằng custom hook.
  const {
    data,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getById(POST_ID, signal),
    [],
  );

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState(null);

  // Đưa dữ liệu GET vào Form.
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  // PUT gửi đầy đủ các trường của bài viết.
  const handleUpdate = async () => {
    if (!form) return;

    setSaving(true);
    setSaveError(null);
    setResult(null);

    try {
      const res = await postApi.update(POST_ID, {
        id: form.id,
        userId: form.userId,
        title: form.title,
        body: form.body,
      });

      setResult({
        status: res.status,
        duration: res.duration,
        data: res.data,
      });
    } catch (err) {
      setSaveError(
        err.userMessage || err.message || "Cập nhật thất bại"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.3 · GET + PUT</strong> /posts/{POST_ID}
      </Card.Header>

      <Card.Body>
        <AsyncContent
          loading={loading || (!!data && !form)}
          error={error}
          data={data}
          onRetry={refetch}
          emptyText="Không tìm thấy bài viết"
          isEmpty={(value) => value == null}
        >
          {() =>
            form && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.body}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        body: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={handleUpdate}
                  disabled={saving}
                >
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
            )
          }
        </AsyncContent>

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
