
import { useState, useEffect } from "react";
import postApi, { userApi } from "./api/postApi";

// Do thoi gian goi request tuan tu va song song
const measure = async (id) => {
  // Cach 1: Tuan tu
  let t0 = performance.now();

  const { data: post } = await postApi.getById(id);
  await userApi.getById(post.userId);
  await postApi.getComments(id);

  const sequential = Math.round(performance.now() - t0);

  // Cach 2: Song song
  t0 = performance.now();

  const { data: post2 } = await postApi.getById(id);

  await Promise.all([
    userApi.getById(post2.userId),
    postApi.getComments(id),
  ]);

  const parallel = Math.round(performance.now() - t0);

  return { sequential, parallel };
};

function PostDetail({ postId = 1 }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timing, setTiming] = useState(null);
  const [measuring, setMeasuring] = useState(false);
  const [timingError, setTimingError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      setDetail(null);

      try {
        // Buoc 1: Phai lay bai viet truoc de biet userId
        const { data: post } = await postApi.getById(postId);

        // Buoc 2: Lay tac gia va binh luan bang Promise.allSettled
        const [userResult, commentsResult] =
          await Promise.allSettled([
            userApi.getById(post.userId),
            postApi.getComments(postId),
          ]);

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

        setDetail({
          post,
          author,
          comments,
          warning,
        });
      } catch (err) {
        // Neu khong lay duoc bai viet thi ca khoi khong the hien thi
        setError(
          err.userMessage || "Không thể tải thông tin bài viết"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [postId]);

  const handleMeasure = async () => {
    setMeasuring(true);
    setTimingError(null);
    setTiming(null);

    try {
      const result = await measure(postId);
      setTiming(result);
    } catch (err) {
      setTimingError(
        err.userMessage || "Không thể đo thời gian request"
      );
    } finally {
      setMeasuring(false);
    }
  };

  if (loading) {
    return <p>Đang tải thông tin bài viết...</p>;
  }

  if (error) {
    return <p className="text-danger">Lỗi: {error}</p>;
  }

  if (!detail) return null;

  const { post, author, comments, warning } = detail;

  return (
    <div className="container py-4">
      <h2>{post.title}</h2>

      {warning && (
        <p style={{ color: "orange" }}>⚠ {warning}</p>
      )}

      <p>
        Tác giả:{" "}
        <strong>
          {author?.name ?? `User ${post.userId}`}
        </strong>
        {author && ` (${author.email})`}
      </p>

      <p>{post.body}</p>

      <button
        type="button"
        onClick={handleMeasure}
        disabled={measuring}
        className="btn btn-primary"
      >
        {measuring ? "Đang đo..." : "Đo thời gian"}
      </button>

      {timingError && (
        <p className="text-danger mt-2">{timingError}</p>
      )}

      {timing && (
        <div className="mt-3">
          <p>
            Tuần tự: <strong>{timing.sequential} ms</strong>
          </p>
          <p>
            Song song: <strong>{timing.parallel} ms</strong>
          </p>
          <p>
            Chênh lệch:{" "}
            <strong>
              {timing.sequential - timing.parallel} ms
            </strong>
          </p>
        </div>
      )}

      <h3>Bình luận ({comments.length})</h3>

      {comments.length === 0 ? (
        <p>Chưa có bình luận hoặc không tải được bình luận.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.name}</strong>: {comment.body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostDetail;
