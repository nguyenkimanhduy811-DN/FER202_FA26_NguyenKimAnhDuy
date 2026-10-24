
import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

export default function PostForm({
  initialValues = {},
  users = [],
  loadingAuthors = false,
  submitting = false,
  serverError = null,
  submitText = "Lưu bài viết",
  onSubmit,
}) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const [errors, setErrors] = useState({});

  // Cập nhật dữ liệu ban đầu khi tải bài viết để chỉnh sửa.
  useEffect(() => {
    setForm({
      title: initialValues.title ?? "",
      body: initialValues.body ?? "",
      userId: initialValues.userId
        ? String(initialValues.userId)
        : "",
    });

    setErrors({});
  }, [
    initialValues.id,
    initialValues.title,
    initialValues.body,
    initialValues.userId,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (form.title.trim().length < 5) {
      nextErrors.title = "Tiêu đề phải có ít nhất 5 ký tự.";
    }

    if (form.body.trim().length < 10) {
      nextErrors.body = "Nội dung phải có ít nhất 10 ký tự.";
    }

    if (!form.userId) {
      nextErrors.userId = "Vui lòng chọn tác giả.";
    }

    setErrors(nextErrors);

    // Không gọi API khi dữ liệu không hợp lệ.
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit({
      title: form.title.trim(),
      body: form.body.trim(),
      userId: Number(form.userId),
    });
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {serverError && (
        <Alert variant="danger">
          {serverError}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Tiêu đề</Form.Label>

        <Form.Control
          name="title"
          value={form.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
          placeholder="Nhập tiêu đề bài viết"
          disabled={submitting}
        />

        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nội dung</Form.Label>

        <Form.Control
          as="textarea"
          rows={5}
          name="body"
          value={form.body}
          onChange={handleChange}
          isInvalid={!!errors.body}
          placeholder="Nhập nội dung bài viết"
          disabled={submitting}
        />

        <Form.Control.Feedback type="invalid">
          {errors.body}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tác giả</Form.Label>

        <Form.Select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          isInvalid={!!errors.userId}
          disabled={submitting || loadingAuthors}
        >
          <option value="">
            {loadingAuthors
              ? "Đang tải danh sách tác giả..."
              : "— Chọn tác giả —"}
          </option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {errors.userId}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        disabled={submitting || loadingAuthors}
      >
        {submitting ? (
          <>
            <Spinner
              animation="border"
              size="sm"
              className="me-2"
            />
            Đang xử lý...
          </>
        ) : (
          submitText
        )}
      </Button>
    </Form>
  );
}
