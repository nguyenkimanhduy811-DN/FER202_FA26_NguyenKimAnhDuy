import { Routes, Route, Navigate } from "react-router-dom";

import CourseListPage from "./pages/CourseListPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/courses" replace />}
      />

      <Route
        path="/courses"
        element={<CourseListPage />}
      />

      <Route
        path="/courses/:code"
        element={<CourseDetailPage />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;