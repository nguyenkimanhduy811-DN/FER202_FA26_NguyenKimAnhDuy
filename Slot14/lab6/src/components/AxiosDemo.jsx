
import { useState, useEffect } from "react";
import postApi from "../api/postApi";
import { Alert, Card, Container, Spinner } from "react-bootstrap";

function AxiosDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Goi API thong qua service, khong viet URL day du
        const response = await postApi.getById(1);

        setData(response.data);
      } catch (err) {
        // Loi tieng Viet da duoc gan boi response interceptor
        setError(err.userMessage || "Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
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
      <h2>Axios Demo</h2>
      <Card>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{data.body}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AxiosDemo;
