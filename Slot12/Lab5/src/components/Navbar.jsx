import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" end>
          Lab5
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={NavLink} to="/new">
              New
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;