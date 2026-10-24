

import { Container } from "react-bootstrap";

import AxiosDemo from "./components/AxiosDemo";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import PatchPost from "./components/PatchPost";
import DeletePost from "./components/DeletePost";
import RequestConfig from "./components/RequestConfig";
import PostDetail from "./PostDetail";

function App() {
  return (
    <div>
      <header className="bg-dark text-white py-4">
        <Container>
          <h1>Axios Demo - TODO 3</h1>
          <p className="mb-0">
            Axios Instance, Interceptors, Service và Promise
          </p>
        </Container>
      </header>

      <main>
        <AxiosDemo />
        <hr />

        <PostList />
        <hr />

        <CreatePost />
        <hr />

        <UpdatePost />
        <hr />

        <PatchPost />
        <hr />

        <DeletePost />
        <hr />

        <RequestConfig />
        <hr />

        <PostDetail postId={1} />
      </main>
    </div>
  );
}

export default App;

