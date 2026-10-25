
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

import useAxios from "../hooks/useAxios";
import postApi, { userApi } from "../api/postApi";
import PostForm from "../components/PostForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorAlert from "../components/common/ErrorAlert";

// GET bài viết và danh sách tác giả đồng thời.
const loadEditData = async (id, signal) => {
  const [postRes, usersRes] = await Promise.all([
    postApi.getById(id, signal),
    userApi.getAll(signal),
  ]);

  // useAxios nhận response có thuộc tính data.
  return {
    data: {
      post: postRes.data,
      users: usersRes.data,
    },
  };
};

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // [id] giúp tải lại dữ liệu khi chuyển sang bài viết khác.
  const {
    data,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => loadEditData(id, signal),
    [id]
  );

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // PUT cập nhật toàn bộ bài viết.
  const handleUpdate = async (values) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await postApi.update(id, {
        id: Number(id),
        ...values,
      });

      navigate(`/posts/${id}`, {
        state: {
          flash: {
            bg: "success",
            message: `PUT /posts/${id} → ${res.status}. Đã cập nhật bài viết.`,
          },
        },
      });
    } catch (err) {
      setServerError(
        err.userMessage || err.message || "Cập nhật thất bại."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Đang tải bài viết và tác giả..." />;
  }

  if (error) {
    return (
      <ErrorAlert
        message={error}
        onRetry={refetch}
      />
    );
  }

  if (!data?.post) {
    return (
      <ErrorAlert
        message="Không tìm thấy dữ liệu bài viết."
        onRetry={refetch}
      />
    );
  }

  const { post, users } = data;

  return (
    <Card className="shadow-sm">
      <Card.Header as="h4">
        Sửa bài viết #{id} (PUT)
      </Card.Header>

      <Card.Body>
        <PostForm
          initialValues={post}
          users={users}
          submitting={submitting}
          serverError={serverError}
          submitText="Lưu thay đổi (PUT)"
          onSubmit={handleUpdate}
        />
      </Card.Body>
    </Card>
  );
}
