import { Routes, Route } from "react-router-dom";
import StudentDirectoryPage from "./pages/StudentDirectoryPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<StudentDirectoryPage />}
      />

      <Route
        path="*"
        element={
          <div className="container py-5 text-center">
            <h1 className="text-danger">404 - Không tìm thấy trang</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;