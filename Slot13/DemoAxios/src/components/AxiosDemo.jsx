
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Card, Container, Spinner } from "react-bootstrap";

function AxiosDemo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải danh sách bài viết...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          Lỗi khi tải danh sách bài viết: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-primary fw-bold mb-4">
        Danh sách bài viết
      </h1>

      <p className="text-muted">
        Tổng số bài viết: {data.length}
      </p>

      <div className="row g-4">
        {data.map((post) => (
          <div className="col-12 col-md-6 col-lg-4" key={post.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Subtitle className="text-primary mb-2">
                  Bài viết #{post.id}
                </Card.Subtitle>

                <Card.Title className="text-capitalize">
                  {post.title}
                </Card.Title>

                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AxiosDemo;
