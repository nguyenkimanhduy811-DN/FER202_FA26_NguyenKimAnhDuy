
import { Container } from "react-bootstrap";

import AxiosDemo from "./components/AxiosDemo";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import PatchPost from "./components/PatchPost";
import DeletePost from "./components/DeletePost";
import RequestConfig from "./components/RequestConfig";

function App() {
  return (
    <div>
      <header className="bg-dark text-white py-4">
        <Container>
          <h1>Axios Demo - TODO 2</h1>
          <p className="mb-0">
            Axios Instance, Interceptors và tầng Service
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
      </main>
    </div>
  );
}

export default App;
