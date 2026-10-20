
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Container,
  ListGroup,
  Spinner,
} from "react-bootstrap";

const API = "https://jsonplaceholder.typicode.com/posts";

function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // 1. Lấy 5 bài viết đầu tiên khi component được mount.
  useEffect(() => {
    axios
      .get(API, {
        params: { _limit: 5 },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 2. Xác nhận và gửi DELETE request.
  const handleDelete = (id) => {
    const confirmed = window.confirm(`Xóa bài viết #${id}?`);

    if (!confirmed) return;

    setDeletingId(id);
    setError(null);
    setMessage("");

    axios
      .delete(`${API}/${id}`)
      .then((response) => {
        // Chỉ xóa khỏi giao diện khi request thành công.
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== id)
        );

        setMessage(
          `Đã xóa bài #${id} – Status: ${response.status}`
        );
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  return (
    <Container className="py-4">
      <h2 className="text-primary fw-bold mb-3">
        Bài 2.5 – DELETE xóa bài viết
      </h2>

      <p className="text-muted">
        Danh sách 5 bài viết đầu tiên từ JSONPlaceholder.
      </p>

      {message && (
        <Alert variant="success">
          {message}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          Lỗi: {error}
        </Alert>
      )}

      {loading && (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" />
          <span>Đang tải bài viết...</span>
        </div>
      )}

      {!loading && !error && (
        <>
          <p>
            Số bài viết còn hiển thị: <strong>{posts.length}</strong>
          </p>

          <ListGroup>
            {posts.length > 0 ? (
              posts.map((post) => (
                <ListGroup.Item
                  key={post.id}
                  className="d-flex justify-content-between align-items-center gap-3"
                >
                  <span className="post-title">
                    <strong>#{post.id}</strong> – {post.title}
                  </span>

                  <Button
                    variant="danger"
                    size="sm"
                    disabled={deletingId !== null}
                    onClick={() => handleDelete(post.id)}
                  >
                    {deletingId === post.id
                      ? "Đang xóa..."
                      : "Xóa"}
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center text-muted">
                Không còn bài viết nào trong danh sách.
              </ListGroup.Item>
            )}
          </ListGroup>
        </>
      )}
    </Container>
  );
}

export default DeletePost;
