
import { Card, ListGroup, Table } from "react-bootstrap";

import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import axiosClient from "../../api/axiosClient";

// Hàm này trả về object có data để useAxios đọc.
const loadWithConfig = async (signal) => {
  const res = await axiosClient({
    method: "get",
    url: "/posts",
    params: {
      _page: 1,
      _limit: 3,
    },
    headers: {
      Accept: "application/json",
      "X-Client": "FER202",
    },
    timeout: 5000,
    signal,
  });

  return {
    data: {
      status: res.status,
      duration: res.duration,
      contentType: res.headers["content-type"],
      total: res.headers["x-total-count"],
      items: res.data,
    },
  };
};

export default function RequestConfigCard() {
  const {
    data: info,
    loading,
    error,
    refetch,
  } = useAxios(loadWithConfig, []);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.6 · axios(config)</strong>{" "}
        headers · params · timeout
      </Card.Header>

      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={info}
          onRetry={refetch}
          isEmpty={(value) => value == null}
        >
          {(result) => (
            <>
              <Table size="sm" bordered className="small">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>{result.status}</td>
                  </tr>

                  <tr>
                    <th>Thời gian</th>
                    <td>{result.duration ?? "N/A"} ms</td>
                  </tr>

                  <tr>
                    <th>Content-Type</th>
                    <td>{result.contentType}</td>
                  </tr>

                  <tr>
                    <th>x-total-count</th>
                    <td>{result.total ?? "Không có"}</td>
                  </tr>
                </tbody>
              </Table>

              <ListGroup variant="flush">
                {result.items.map((post) => (
                  <ListGroup.Item key={post.id}>
                    {post.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </AsyncContent>
      </Card.Body>
    </Card>
  );
}
