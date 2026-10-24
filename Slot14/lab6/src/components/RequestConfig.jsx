
import { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "https://jsonplaceholder.typicode.com/posts",
          params: {
            _page: 1,
            _limit: 3,
          },
          headers: {
            Accept: "application/json",
            Authorization: "Bearer demo-token-123",
          },
          timeout: 5000,
        });

        setInfo({
          status: response.status,
          contentType: response.headers["content-type"],
          total: response.headers["x-total-count"],
          data: response.data,
        });
      } catch (error) {
        if (
          error.code === "ECONNABORTED" ||
          error.code === "ETIMEDOUT"
        ) {
          setError("Request quá thời gian (timeout).");
        } else if (error.response) {
          setError(`Server trả lỗi ${error.response.status}.`);
        } else {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-primary fw-bold mb-3">
        Bài 2.6 – Cấu hình request
      </h2>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          {error && (
            <Alert variant="danger">
              Lỗi: {error}
            </Alert>
          )}

          {!info && !error && (
            <div className="d-flex align-items-center gap-2">
              <Spinner animation="border" size="sm" />
              <span>Đang tải dữ liệu...</span>
            </div>
          )}

          {info && (
            <>
              <Alert variant="success">
                Request thành công — Status: {info.status}
              </Alert>

              <p>
                <strong>HTTP Status:</strong> {info.status}
              </p>

              <p>
                <strong>Content-Type:</strong>{" "}
                {info.contentType ?? "Không có header"}
              </p>

              <p>
                <strong>Tổng số bài viết (x-total-count):</strong>{" "}
                {info.total ?? "Server không cung cấp header này"}
              </p>

              <h5 className="mt-4 mb-3">
                Ba bài viết nhận được
              </h5>

              <ListGroup>
                {info.data.map((post) => (
                  <ListGroup.Item key={post.id}>
                    <strong>#{post.id}</strong> – {post.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <h5 className="mt-4">Response JSON</h5>

              <pre className="response-json mb-0">
                {JSON.stringify(info.data, null, 2)}
              </pre>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RequestConfig;
