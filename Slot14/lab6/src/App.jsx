
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AxiosDemoPage from "./pages/AxiosDemoPage";
import HttpRequestsPage from "./pages/HttpRequestsPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AxiosDemoPage />} />

        <Route
          path="http"
          element={<HttpRequestsPage />}
        />

        <Route path="posts">
          <Route
            index
            element={<PostListPage />}
          />

          <Route
            path="new"
            element={<PostCreatePage />}
          />

          <Route
            path=":id"
            element={<PostDetailPage />}
          />

          <Route
            path=":id/edit"
            element={<PostEditPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}
