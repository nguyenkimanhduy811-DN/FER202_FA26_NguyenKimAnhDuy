
import { Container, Row, Col } from "react-bootstrap";

import AxiosDemo from "./components/AxiosDemo";
import PostListCard from "./components/http/PostListCard";
import CreatePostCard from "./components/http/CreatePostCard";
import UpdatePostCard from "./components/http/UpdatePostCard";
import PatchPostCard from "./components/http/PatchPostCard";
import DeletePostCard from "./components/http/DeletePostCard";
import RequestConfigCard from "./components/http/RequestConfigCard";

export default function App() {
  return (
    <Container className="py-4">
      <AxiosDemo />

      <h2 className="mt-5 mb-3">
        HTTP Requests với Axios
      </h2>

      <Row xs={1} lg={2} className="g-4">
        <Col>
          <PostListCard />
        </Col>

        <Col>
          <CreatePostCard />
        </Col>

        <Col>
          <UpdatePostCard />
        </Col>

        <Col>
          <PatchPostCard />
        </Col>

        <Col>
          <DeletePostCard />
        </Col>

        <Col>
          <RequestConfigCard />
        </Col>
      </Row>
    </Container>
  );
}
