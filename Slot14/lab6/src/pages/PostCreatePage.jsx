
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

import postApi, { userApi } from "../api/postApi";
import PostForm from "../components/PostForm";

export default function PostCreatePage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [authorError, setAuthorError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // GET danh sách tác giả.
  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const res = await userApi.getAll(controller.signal);
        setUsers(res.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setAuthorError(
            err.userMessage || "Không thể tải danh sách tác giả."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingAuthors(false);
        }
      }
    };

    loadUsers();

    return () => controller.abort();
  }, []);

  // POST tạo bài viết.
  const handleCreate = async (values) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await postApi.create(values);

      navigate("/posts", {
        state: {
          flash: {
            bg: "success",
            message: `POST /posts → ${res.status}. Đã tạo bài viết #${res.data.id}.`,
          },
        },
      });
    } catch (err) {
      setServerError(
        err.userMessage || err.message || "Tạo bài viết thất bại."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h4">
        Tạo bài viết mới (POST)
      </Card.Header>

      <Card.Body>
        {authorError && (
          <Alert variant="danger">
            {authorError}
          </Alert>
        )}

        {loadingAuthors ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Đang tải danh sách tác giả...</p>
          </div>
        ) : (
          <>
            <PostForm
              initialValues={{
                title: "",
                body: "",
                userId: "",
              }}
              users={users}
              loadingAuthors={loadingAuthors}
              submitting={submitting}
              serverError={serverError}
              submitText="Tạo bài viết"
              onSubmit={handleCreate}
            />

            <Button
              className="mt-2"
              variant="outline-secondary"
              onClick={() => navigate("/posts")}
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
