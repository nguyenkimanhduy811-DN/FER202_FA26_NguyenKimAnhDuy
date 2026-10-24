import { useState, useEffect } from "react";
import axios from "axios";
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
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId: 1,
          _limit: 5,
        },
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

  return (
    <Container className="py-4">
      <h2 className="mb-3">
        Bài 2.1 – GET danh sách bài viết
      </h2>

      <p className="text-muted">
        Lấy 5 bài viết của User ID 1 bằng Axios Query Params.
      </p>

      {loading && (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" />
          <span>Đang tải bài viết...</span>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          Lỗi khi tải bài viết: {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <Alert variant="success">
            Đã tải {posts.length} bài viết thành công.
          </Alert>

          <ListGroup>
            {posts.map((post) => (
              <ListGroup.Item key={post.id}>
                <div className="fw-bold">
                  #{post.id} – {post.title}
                </div>

                <div className="text-muted small mt-2">
                  {post.body}
                </div>

                <span className="badge bg-primary mt-2">
                  User ID: {post.userId}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
}

export default PostList;