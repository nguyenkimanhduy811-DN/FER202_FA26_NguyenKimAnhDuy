
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

import postApi, { userApi } from "../api/postApi";
import PostForm from "../components/PostForm";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(null);

  // GET bài viết và danh sách tác giả song song.
  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);
      setError(null);
      setPost(null);

      try {
        const [postRes, usersRes] = await Promise.all([
          postApi.getById(id, controller.signal),
          userApi.getAll(controller.signal),
        ]);

        setPost(postRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        if (axios.isCancel(err) || controller.signal.aborted) {
          return;
        }

        setError(
          err.userMessage || "Không thể tải dữ liệu bài viết."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, [id]);

  // PUT cập nhật toàn bộ bài viết.
  const handleUpdate = async (values) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await postApi.update(id, {
        id: Number(id),
        title: values.title,
        body: values.body,
        userId: values.userId,
      });

      navigate(`/posts/${id}`, {
        state: {
          flash: {
            bg: "success",
            message: `PUT /posts/${id} → ${res.status}. Cập nhật bài viết thành công!`,
          },
        },
      });
    } catch (err) {
      setServerError(
        err.userMessage || err.message || "Cập nhật bài viết thất bại."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h4">
        Chỉnh sửa bài viết #{id} (PUT)
      </Card.Header>

      <Card.Body>
        {loading && (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Đang tải dữ liệu...</p>
          </div>
        )}

        {!loading && error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        {!loading && !error && post && (
          <>
            <PostForm
              initialValues={post}
              users={users}
              submitting={submitting}
              serverError={serverError}
              submitText="Lưu thay đổi (PUT)"
              onSubmit={handleUpdate}
            />

            <Button
              className="mt-2"
              variant="outline-secondary"
              onClick={() => navigate(`/posts/${id}`)}
              disabled={submitting}
            >
              Hủy
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
