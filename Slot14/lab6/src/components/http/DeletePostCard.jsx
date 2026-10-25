
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";

import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import ConfirmModal from "../ConfirmModal";
import postApi from "../../api/postApi";

export default function DeletePostCard() {
  const { notify } = useOutletContext();

  // GET danh sách bằng custom hook.
  const {
    data: posts,
    setData: setPosts,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getAll({ _limit: 5 }, signal),
    [],
    { initialData: [] }
  );

  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!toDelete || deleting) return;

    setDeleting(true);

    try {
      const res = await postApi.remove(toDelete.id);

      // Cập nhật danh sách cục bộ, không cần GET lại.
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
          err.userMessage || err.message
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
        <AsyncContent
          loading={loading}
          error={error}
          data={posts}
          onRetry={refetch}
          emptyText="Đã xóa hết bài viết đang hiển thị."
        >
          {(items) => (
            <ListGroup variant="flush">
              {items.map((post) => (
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
                    disabled={deleting}
                    onClick={() => setToDelete(post)}
                  >
                    Xóa
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </AsyncContent>
      </Card.Body>

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={`Bạn có chắc chắn muốn xóa bài viết #${toDelete?.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!deleting) setToDelete(null);
        }}
      />
    </Card>
  );
}
