import { Routes, Route } from "react-router-dom";

import EventPage from "./pages/EventPage";
import RegisterPage from "./pages/RegisterPage";
import SuccessPage from "./pages/SuccessPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/success" element={<SuccessPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;