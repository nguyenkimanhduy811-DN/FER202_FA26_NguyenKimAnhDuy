import AxiosDemo from "./components/AxiosDemo";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import PatchPost from "./components/PatchPost";
import DeletePost from "./components/DeletePost";
import RequestConfig from "./components/RequestConfig";

import "./App.css";

function App() {
  return (
    <div className="axios-app">
      <header className="text-center py-4 bg-primary text-white">
        <h1 className="fw-bold">Exercise 27 - DemoAxios</h1>
        <p className="mb-0">
          TODO 1 – Async/Await
        </p>
      </header>

      <AxiosDemo />
      <hr className="section-divider" />

      <PostList />
      <hr className="section-divider" />

      <CreatePost />
      <hr className="section-divider" />

      <UpdatePost />
      <hr className="section-divider" />

      <PatchPost />
      <hr className="section-divider" />

      <DeletePost />
      <hr className="section-divider" />

      <RequestConfig />

      <footer className="text-center py-4 text-muted">
        Exercise 27 — TODO 1
      </footer>
    </div>
  );
}

export default App;