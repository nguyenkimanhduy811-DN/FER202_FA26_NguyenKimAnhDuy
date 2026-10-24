
import { useState, useEffect } from "react";
import postApi from "../api/postApi";
import {
  Alert,
  Container,
  ListGroup,
  Spinner,
} from "react-bootstrap";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postApi.getAll({
          userId: 1,
          _limit: 5,
        });

        setPosts(response.data);
      } catch (err) {
        setError(err.userMessage || "Không thể tải danh sách bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container className="py-4">
        <Spinner animation="border" size="sm" /> Loading...
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>GET – Danh sách bài viết của user 1</h2>

      {posts.length === 0 ? (
        <Alert variant="info">Không có bài viết nào.</Alert>
      ) : (
        <ListGroup>
          {posts.map((post) => (
            <ListGroup.Item key={post.id}>
              #{post.id} – {post.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default PostList;
