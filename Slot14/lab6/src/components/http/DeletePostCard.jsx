
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import {
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";

import postApi from "../../api/postApi";
import ConfirmModal from "../ConfirmModal";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";
import EmptyState from "../common/EmptyState";

export default function DeletePostCard() {
  const { notify } = useOutletContext();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await postApi.getAll(
          { _limit: 5 },
          controller.signal
        );

        setPosts(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(
          err.userMessage || "Không thể tải bài viết"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => controller.abort();
  }, []);

  const handleDelete = async () => {
    if (!toDelete || deleting) return;

    setDeleting(true);

    try {
      const res = await postApi.remove(toDelete.id);

      setPosts((prev) =>
        prev.filter((post) => post.id !== toDelete.id)
      );

      notify(
        "success",
        `DELETE /posts/${toDelete.id} → ${res.status}`
      );

      setToDelete(null);
    } catch (err) {
      notify(
        "danger",
        `Xóa thất bại: ${
          err.userMessage ||
          err.message ||
          "Lỗi không xác định"
        }`
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.5 · DELETE</strong> /posts/:id
      </Card.Header>

      <Card.Body>
        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorAlert message={error} />
        )}

        {!loading && !error && posts.length === 0 && (
          <EmptyState text="Đã xóa hết bài viết đang hiển thị." />
        )}

        {!loading && !error && posts.length > 0 && (
          <ListGroup variant="flush">
            {posts.map((post) => (
              <ListGroup.Item
                key={post.id}
                className="d-flex justify-content-between align-items-center gap-2"
              >
                <span>
                  #{post.id} – {post.title}
                </span>

                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => setToDelete(post)}
                  disabled={deleting}
                >
                  Xóa
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={`Bạn có chắc chắn muốn xóa bài viết #${toDelete?.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!deleting) {
            setToDelete(null);
          }
        }}
      />
    </Card>
  );
}
