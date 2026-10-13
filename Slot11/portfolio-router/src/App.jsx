import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  return (
    <>
      <AppNavbar />

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/skills" element={<SkillsPage />} />

          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer text-center py-3">
        <Container>
          <small>
            © 2026 My Portfolio. Built with React.
          </small>
        </Container>
      </footer>
    </>
  );
}

export default App;