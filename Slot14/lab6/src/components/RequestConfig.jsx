
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import {
  Alert,
  Card,
  Container,
  ListGroup,
  Spinner,
} from "react-bootstrap";

function RequestConfig() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithConfig = async () => {
      try {
        const response = await axiosClient({
          method: "get",
          url: "/posts",
          params: {
            _page: 1,
            _limit: 3,
          },
          headers: {
            Accept: "application/json",
            "X-Client": "FER202",
          },
          timeout: 5000,
        });

        setInfo({
          status: response.status,
          duration: response.duration,
          contentType: response.headers["content-type"],
          total: response.headers["x-total-count"],
          data: response.data,
        });
      } catch (err) {
        setError(err.userMessage || "Không thể gửi request");
      } finally {
        setLoading(false);
      }
    };

    fetchWithConfig();
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
      <h2>Cấu hình request</h2>

      <Card>
        <Card.Body>
          <p>Status: {info.status}</p>

          <p>
            Thời gian xử lý: {info.duration ?? "N/A"} ms
          </p>

          <p>
            Content-Type: {info.contentType || "Không có"}
          </p>

          <p>
            Tổng số bài viết (x-total-count):{" "}
            {info.total ?? "Server không cung cấp header này"}
          </p>

          <h5>Danh sách bài viết</h5>

          <ListGroup>
            {info.data.map((post) => (
              <ListGroup.Item key={post.id}>
                #{post.id} – {post.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RequestConfig;
