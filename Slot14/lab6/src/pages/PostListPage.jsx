
import { useState } from "react";
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
import useAxios from "../hooks/useAxios";
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
  const page =
    Number.isInteger(pageValue) && pageValue > 0
      ? pageValue
      : 1;

  const userId = searchParams.get("userId") ?? "";

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

  // NC8: GET danh sách tác giả.
  const {
    data: users,
    loading: loadingUsers,
    error: usersError,
    refetch: retryUsers,
  } = useAxios(
    (signal) => userApi.getAll(signal),
    [],
    { initialData: [] }
  );

  // Chuẩn bị tham số cho GET bài viết.
  const params = {
    _page: page,
    _limit: LIMIT,
  };

  if (userId) {
    params.userId = userId;
  }

  // NC8: GET bài viết, tự hủy request khi page/userId đổi.
  const {
    data: posts,
    setData: setPosts,
    headers,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getAll(params, signal),
    [page, userId],
    { initialData: [] }
  );

  // Số trang lấy từ header của API.
  const total = Number(
    headers["x-total-count"] ?? posts.length
  );

  const totalPages = Math.max(
    1,
    Math.ceil(total / LIMIT)
  );

  const authorName = (id) =>
    users.find((user) => String(user.id) === String(id))?.name ??
    `User ${id}`;

  // DELETE một bài viết.
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteOne = async () => {
    if (!toDelete || deleting) return;

    setDeleting(true);

    try {
      const res = await postApi.remove(toDelete.id);

      // Cập nhật tức thời danh sách đang hiển thị.
      setPosts((prev) =>
        prev.filter((post) => post.id !== toDelete.id)
      );

      notify(
        "success",
        `DELETE /posts/${toDelete.id} → ${res.status}`
      );

      setToDelete(null);

      // Tải lại để cập nhật số lượng và dữ liệu phân trang.
      refetch();
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

      <Row className="mb-3 g-2">
        <Col md={4}>
          <Form.Select
            value={userId}
            aria-label="Lọc theo tác giả"
            disabled={loadingUsers}
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

          {usersError && (
            <div className="mt-2">
              <ErrorAlert
                message={usersError}
                onRetry={retryUsers}
              />
            </div>
          )}
        </Col>

        <Col md={2} className="d-flex align-items-center">
          {loading && (
            <Spinner size="sm" animation="border" />
          )}
        </Col>
      </Row>

      {error && (
        <ErrorAlert
          message={error}
          onRetry={refetch}
        />
      )}

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
                  disabled={deleting}
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
            disabled={loading}
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

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={
          <>
            Bạn có chắc chắn muốn xóa{" "}
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
