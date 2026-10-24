
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Link,
  useSearchParams,
  useOutletContext,
} from "react-router-dom";
import {
  Table,
  Form,
  Pagination,
  Spinner,
  Button,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

import useFlash from "../hooks/useFlash";
import postApi, { userApi } from "../api/postApi";
import ConfirmModal from "../components/ConfirmModal";
import ErrorAlert from "../components/common/ErrorAlert";

const LIMIT = 5;

export default function PostListPage() {
  useFlash();

  const { notify } = useOutletContext();

  // Đọc trạng thái phân trang và lọc từ URL.
  const [searchParams, setSearchParams] = useSearchParams();

  const pageValue = Number(searchParams.get("page") ?? 1);
  const page = Number.isInteger(pageValue) && pageValue > 0
    ? pageValue
    : 1;

  const userId = searchParams.get("userId") ?? "";

  // Cập nhật query string nhưng giữ lại các điều kiện khác.
  const changeQuery = (next) => {
    const merged = {
      page: String(page),
      userId,
      ...next,
    };

    Object.keys(merged).forEach((key) => {
      if (merged[key] === "" || merged[key] == null) {
        delete merged[key];
      }
    });

    setSearchParams(merged);
  };

  // Lấy danh sách tác giả.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const res = await userApi.getAll(controller.signal);
        setUsers(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(
            err.userMessage || "Không thể tải danh sách tác giả"
          );
        }
      }
    };

    loadUsers();

    return () => controller.abort();
  }, []);

  // Lấy bài viết theo page và userId.
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          _page: page,
          _limit: LIMIT,
        };

        if (userId) {
          params.userId = userId;
        }

        const res = await postApi.getAll(
          params,
          controller.signal
        );

        setPosts(res.data);

        // HTTP header được Axios chuyển thành chữ thường.
        setTotal(
          Number(res.headers["x-total-count"] ?? res.data.length)
        );
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(
          err.userMessage || "Không thể tải danh sách bài viết"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => controller.abort();
  }, [page, userId, reloadKey]);

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const authorName = (id) =>
    users.find((user) => user.id === id)?.name ?? `User ${id}`;

  // Xóa bài viết bằng DELETE sau khi xác nhận.
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteOne = async () => {
    if (!toDelete) return;

    setDeleting(true);

    try {
      const res = await postApi.remove(toDelete.id);

      setPosts((prev) =>
        prev.filter((post) => post.id !== toDelete.id)
      );

      setTotal((prev) => Math.max(0, prev - 1));

      notify(
        "success",
        `DELETE /posts/${toDelete.id} → ${res.status}`
      );

      setToDelete(null);
    } catch (err) {
      notify(
        "danger",
        `Xóa thất bại: ${err.userMessage || err.message}`
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="m-0">
          Bài viết <Badge bg="secondary">{total}</Badge>
        </h2>

        <Button as={Link} to="/posts/new">
          + Tạo bài viết
        </Button>
      </div>

      {/* Bộ lọc tác giả */}
      <Row className="mb-3 g-2 align-items-center">
        <Col md={4}>
          <Form.Select
            aria-label="Lọc theo tác giả"
            value={userId}
            onChange={(e) =>
              changeQuery({
                userId: e.target.value,
                page: "1",
              })
            }
          >
            <option value="">Tất cả tác giả</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={2}>
          {loading && (
            <span className="text-muted">
              <Spinner size="sm" className="me-2" />
              Đang tải...
            </span>
          )}
        </Col>
      </Row>

      {error && (
        <ErrorAlert
          message={error}
          onRetry={() => setReloadKey((key) => key + 1)}
        />
      )}

      {/* Bảng bài viết */}
      <Table
        striped
        bordered
        hover
        responsive
        className={loading ? "opacity-50" : ""}
      >
        <thead>
          <tr>
            <th style={{ width: 60 }}>#</th>
            <th>Tiêu đề</th>
            <th style={{ width: 170 }}>Tác giả</th>
            <th style={{ width: 190 }}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>

              <td>
                <Link to={`/posts/${post.id}`}>
                  {post.title}
                </Link>
              </td>

              <td>{authorName(post.userId)}</td>

              <td>
                <Button
                  as={Link}
                  to={`/posts/${post.id}`}
                  size="sm"
                  variant="outline-info"
                  className="me-1"
                >
                  Xem
                </Button>

                <Button
                  as={Link}
                  to={`/posts/${post.id}/edit`}
                  size="sm"
                  variant="outline-primary"
                  className="me-1"
                >
                  Sửa
                </Button>

                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => setToDelete(post)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}

          {!loading && !error && posts.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                Không có bài viết phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Phân trang */}
      <Pagination className="justify-content-center flex-wrap">
        <Pagination.Prev
          disabled={page <= 1 || loading}
          onClick={() =>
            changeQuery({ page: String(page - 1) })
          }
        />

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((number) => (
          <Pagination.Item
            key={number}
            active={number === page}
            onClick={() =>
              changeQuery({ page: String(number) })
            }
          >
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={page >= totalPages || loading}
          onClick={() =>
            changeQuery({ page: String(page + 1) })
          }
        />
      </Pagination>

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={
          <>
            Bạn có chắc chắn muốn xóa bài viết{" "}
            <strong>
              #{toDelete?.id} {toDelete?.title}
            </strong>
            ?
          </>
        }
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDeleteOne}
        onCancel={() => {
          if (!deleting) setToDelete(null);
        }}
      />
    </>
  );
}
