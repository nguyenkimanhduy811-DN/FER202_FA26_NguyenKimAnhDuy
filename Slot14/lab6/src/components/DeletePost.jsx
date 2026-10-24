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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API, {
          params: { _limit: 5 },
        });

        setPosts(response.data);
      } catch (err) {
        setError(err.message);
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
      const response = await axios.delete(`${API}/${id}`);

      setPosts((prev) => prev.filter((post) => post.id !== id));
      setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
    } catch (err) {
      setError(err.message);
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