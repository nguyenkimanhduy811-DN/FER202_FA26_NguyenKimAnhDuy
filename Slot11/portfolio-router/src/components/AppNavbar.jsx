import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const MENU = [
  {
    to: "/",
    label: "Trang chủ",
  },
  {
    to: "/skills",
    label: "Kỹ năng",
  },
  {
    to: "/projects",
    label: "Dự án",
  },
  {
    to: "/contact",
    label: "Liên hệ",
  },
];

function AppNavbar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          My Portfolio
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {MENU.map((item) => (
              <Nav.Link
                as={NavLink}
                to={item.to}
                end={item.to === "/"}
                key={item.to}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;