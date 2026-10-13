
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-wrapper">
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            FPT University Library
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Trang chủ
              </Nav.Link>

              <Nav.Link as={NavLink} to="/books">
                Sách
              </Nav.Link>

              <Nav.Link as={NavLink} to="/help">
                Hướng dẫn
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="py-4 flex-grow-1">
        <Outlet />
      </Container>

      <footer className="site-footer text-center py-3">
        <Container>
          <small>
            © 2026 Thư viện FPT University. All rights reserved.
          </small>
        </Container>
      </footer>
    </div>
  );
}

export default MainLayout;
