
import { useState, useEffect } from "react";
import postApi from "../api/postApi";
import {
  Alert,
  Button,
  Container,
  ListGroup,
  Spinner,
} from "react-bootstrap";

function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postApi.getAll({ _limit: 5 });

        setPosts(response.data);
      } catch (err) {
        setError(err.userMessage || "Không thể tải danh sách bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    setDeletingId(id);
    setError(null);
    setMessage("");

    try {
      const response = await postApi.remove(id);

      setPosts((prev) => prev.filter((post) => post.id !== id));
      setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
    } catch (err) {
      setError(err.userMessage || "Không thể xóa bài viết");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <Spinner animation="border" size="sm" /> Loading...
      </Container>
    );
  }

  if (error && posts.length === 0) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>DELETE – Xóa bài viết</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">Error: {error}</Alert>}

      <p>Số bài viết đang hiển thị: {posts.length}</p>

      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item
            key={post.id}
            className="d-flex justify-content-between align-items-center gap-3"
          >
            <span>
              #{post.id} – {post.title}
            </span>

            <Button
              variant="danger"
              size="sm"
              disabled={deletingId !== null}
              onClick={() => handleDelete(post.id)}
            >
              {deletingId === post.id ? "Đang xóa..." : "Xóa"}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default DeletePost;
