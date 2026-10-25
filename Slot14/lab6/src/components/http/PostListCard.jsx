
import { Card, ListGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import postApi from "../../api/postApi";

export default function PostListCard() {
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) =>
      postApi.getAll(
        { userId: 1, _limit: 5 },
        signal
      ),
    [],
    { initialData: [] }
  );

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.1 · GET</strong>{" "}
        /posts?userId=1&amp;_limit=5
      </Card.Header>

      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={posts}
          onRetry={refetch}
          emptyText="Không có bài viết"
        >
          {(items) => (
            <ListGroup variant="flush">
              {items.map((post) => (
                <ListGroup.Item key={post.id}>
                  #{post.id} – {post.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </AsyncContent>
      </Card.Body>
    </Card>
  );
}
