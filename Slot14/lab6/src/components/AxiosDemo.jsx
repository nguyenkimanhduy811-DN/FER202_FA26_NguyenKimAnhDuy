
import { useState, useEffect } from "react";
import axios from "axios";
import postApi from "../api/postApi";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Spinner,
} from "react-bootstrap";

function AxiosDemo() {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tao controller rieng cho moi request
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        // Truyen signal de co the huy request
        const response = await postApi.getById(
          postId,
          controller.signal
        );

        setData(response.data);
      } catch (err) {
        // Request bi huy khong hien thi loi
        if (axios.isCancel(err)) return;

        setData(null);
        setError(err.userMessage ?? err.message);
      } finally {
        // Khong tat loading neu request nay da bi huy
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    // Huy request cu khi postId doi hoac component unmount
    return () => {
      controller.abort();
    };
  }, [postId]);

  return (
    <Container className="py-4">
      <h2>Axios Demo - AbortController</h2>

      <Card>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Post ID (1–100)</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={100}
              value={postId}
              onChange={(e) =>
                setPostId(Number(e.target.value) || 1)
              }
            />
          </Form.Group>

          <div className="d-flex gap-2 mb-3">
            <Button
              variant="secondary"
              disabled={postId <= 1}
              onClick={() =>
                setPostId((id) => Math.max(1, id - 1))
              }
            >
              ‹ Trước
            </Button>

            <Button
              disabled={postId >= 100}
              onClick={() =>
                setPostId((id) => Math.min(100, id + 1))
              }
            >
              Sau ›
            </Button>
          </div>

          {loading && (
            <div className="my-3">
              <Spinner animation="border" size="sm" /> Đang tải
              bài viết #{postId}...
            </div>
          )}

          {!loading && error && (
            <Alert variant="danger">
              Error: {error}
            </Alert>
          )}

          {!loading && data && (
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>
                  #{data.id} – {data.title}
                </Card.Title>
                <Card.Text>{data.body}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AxiosDemo;
