
import { useState, useEffect } from "react";
import axios from "axios";
import {
  useParams,
  useNavigate,
  Link,
  useOutletContext,
} from "react-router-dom";
import {
  Card,
  Spinner,
  Alert,
  Button,
  ListGroup,
  Form,
  InputGroup,
  Badge,
  Table,
} from "react-bootstrap";

import useAxios from "../hooks/useAxios";
import useFlash from "../hooks/useFlash";
import postApi, { userApi } from "../api/postApi";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/common/LoadingSpinner";

// GET bài viết trước vì cần biết userId.
// Sau đó tải tác giả và bình luận song song.
const loadDetail = async (id, signal) => {
  const { data: post } = await postApi.getById(id, signal);

  const [userResult, commentsResult] = await Promise.allSettled([
    userApi.getById(post.userId, signal),
    postApi.getComments(id, signal),
  ]);

  if (signal.aborted) {
    throw new axios.CanceledError("Request đã bị hủy");
  }

  const author =
    userResult.status === "fulfilled"
      ? userResult.value.data
      : null;

  const comments =
    commentsResult.status === "fulfilled"
      ? commentsResult.value.data
      : [];

  const warning =
    userResult.status === "rejected" ||
    commentsResult.status === "rejected"
      ? "Một số thông tin phụ (tác giả / bình luận) không tải được."
      : null;

  return {
    data: {
      post,
      author,
      comments,
      warning,
    },
  };
};

// So sánh thời gian tải tuần tự và song song.
const measure = async (id) => {
  let start = performance.now();

  const { data: postSequential } = await postApi.getById(id);
  await userApi.getById(postSequential.userId);
  await postApi.getComments(id);

  const sequential = Math.round(performance.now() - start);

  start = performance.now();

  const { data: postParallel } = await postApi.getById(id);

  await Promise.all([
    userApi.getById(postParallel.userId),
    postApi.getComments(id),
  ]);

  const parallel = Math.round(performance.now() - start);

  return { sequential, parallel };
};

export default function PostDetailPage() {
  useFlash();

  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useOutletContext();

  // NC8: useAxios quản lý GET, loading, error và AbortController.
  // Khi id đổi, hook tự hủy request cũ và tải bài viết mới.
  const {
    data,
    setData,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => loadDetail(id, signal),
    [id]
  );

  const [quickTitle, setQuickTitle] = useState("");
  const [patching, setPatching] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [timing, setTiming] = useState(null);
  const [measuring, setMeasuring] = useState(false);

  // Đồng bộ ô tiêu đề khi dữ liệu bài viết thay đổi.
  useEffect(() => {
    if (data?.post) {
      setQuickTitle(data.post.title);
    }
  }, [data]);

  // PATCH chỉ gửi trường title.
  const handlePatch = async (e) => {
    e.preventDefault();

    const title = quickTitle.trim();

    if (title.length < 5) {
      notify("warning", "Tiêu đề phải có tối thiểu 5 ký tự.");
      return;
    }

    if (title === data.post.title) return;

    setPatching(true);

    try {
      const res = await postApi.patch(id, { title });

      setData((prev) => ({
        ...prev,
        post: {
          ...prev.post,
          ...res.data,
        },
      }));

      notify("success", `PATCH /posts/${id} → ${res.status}`);
    } catch (err) {
      notify(
        "danger",
        `Cập nhật thất bại: ${err.userMessage || err.message}`
      );
    } finally {
      setPatching(false);
    }
  };

  // DELETE xong trở về danh sách và gửi thông báo qua navigation state.
  const handleDelete = async () => {
    if (deleting) return;

    setDeleting(true);

    try {
      const res = await postApi.remove(id);

      navigate("/posts", {
        state: {
          flash: {
            bg: "success",
            message: `DELETE /posts/${id} → ${res.status}. Đã xóa bài viết.`,
          },
        },
      });
    } catch (err) {
      notify(
        "danger",
        `Xóa thất bại: ${err.userMessage || err.message}`
      );
      setShowDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  // Đo thời gian cho yêu cầu NC3.
  const handleMeasure = async () => {
    setMeasuring(true);
    setTiming(null);

    try {
      const result = await measure(id);
      setTiming(result);
    } catch (err) {
      notify(
        "danger",
        err.userMessage || err.message || "Không thể đo thời gian."
      );
    } finally {
      setMeasuring(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Đang tải chi tiết bài viết..." />;
  }

  if (error) {
    return (
      <Alert variant="warning">
        <div>{error} – bài viết #{id}.</div>

        <div className="mt-2">
          <Alert.Link as={Link} to="/posts">
            Quay lại danh sách
          </Alert.Link>

          <Button
            size="sm"
            variant="outline-secondary"
            className="ms-3"
            onClick={refetch}
          >
            Thử lại
          </Button>
        </div>
      </Alert>
    );
  }

  if (!data?.post) {
    return (
      <Alert variant="warning">
        Không tìm thấy dữ liệu bài viết.
        {" "}
        <Link to="/posts">Quay lại danh sách</Link>
        {" "}
        <Button size="sm" variant="outline-secondary" onClick={refetch}>
          Thử lại
        </Button>
      </Alert>
    );
  }

  const { post, author, comments, warning } = data;

  return (
    <>
      <Button
        variant="link"
        className="px-0 mb-2"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </Button>

      {warning && <Alert variant="warning">{warning}</Alert>}

      <Card className="mb-4 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span>
            Post #{post.id} ·{" "}
            <strong>{author?.name ?? `User ${post.userId}`}</strong>
            {author?.email && ` (${author.email})`}
          </span>

          <span>
            <Button
              as={Link}
              to={`/posts/${post.id}/edit`}
              size="sm"
              variant="outline-primary"
              className="me-2"
            >
              Sửa (PUT)
            </Button>

            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => setShowDelete(true)}
            >
              Xóa
            </Button>
          </span>
        </Card.Header>

        <Card.Body>
          <Card.Title as="h2" className="fs-3">
            {post.title}
          </Card.Title>

          <Card.Text style={{ whiteSpace: "pre-line" }}>
            {post.body}
          </Card.Text>

          <Form onSubmit={handlePatch} className="mt-4">
            <Form.Label className="small text-muted">
              Sửa nhanh tiêu đề (PATCH)
            </Form.Label>

            <InputGroup>
              <Form.Control
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                disabled={patching}
                isInvalid={
                  quickTitle.trim().length > 0 &&
                  quickTitle.trim().length < 5
                }
              />

              <Button
                type="submit"
                variant="warning"
                disabled={
                  patching ||
                  quickTitle.trim() === post.title ||
                  quickTitle.trim().length < 5
                }
              >
                {patching ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Đang lưu...
                  </>
                ) : (
                  "PATCH"
                )}
              </Button>
            </InputGroup>

            <Form.Control.Feedback type="invalid">
              Tiêu đề phải có ít nhất 5 ký tự.
            </Form.Control.Feedback>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>NC3 · So sánh tuần tự và song song</Card.Header>

        <Card.Body>
          <Button
            size="sm"
            onClick={handleMeasure}
            disabled={measuring}
          >
            {measuring ? (
              <>
                <Spinner size="sm" className="me-2" />
                Đang đo...
              </>
            ) : (
              "Đo thời gian"
            )}
          </Button>

          {timing && (
            <Table
              size="sm"
              bordered
              className="mt-3 mb-0"
              style={{ maxWidth: 420 }}
            >
              <tbody>
                <tr>
                  <th>Tuần tự (3 request nối tiếp)</th>
                  <td>{timing.sequential} ms</td>
                </tr>

                <tr>
                  <th>Song song (1 + Promise.all)</th>
                  <td>{timing.parallel} ms</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <h4 className="mb-3">
        Bình luận <Badge bg="secondary">{comments.length}</Badge>
      </h4>

      <ListGroup className="mb-4">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div className="fw-semibold">{comment.name}</div>

            <small className="text-muted">{comment.email}</small>

            <div className="mt-1">{comment.body}</div>
          </ListGroup.Item>
        ))}

        {comments.length === 0 && (
          <ListGroup.Item className="text-muted">
            Chưa có bình luận.
          </ListGroup.Item>
        )}
      </ListGroup>

      <ConfirmModal
        show={showDelete}
        title="Xóa bài viết"
        message={`Bạn có chắc chắn muốn xóa bài viết #${post.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!deleting) setShowDelete(false);
        }}
      />
    </>
  );
}
