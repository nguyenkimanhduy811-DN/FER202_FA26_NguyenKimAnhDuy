import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <Navbar className="pizza-navbar">
      <Container>
        <Navbar.Brand href="#home" className="pizza-logo">
          Pizza House
        </Navbar.Brand>

        <Nav className="pizza-nav">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#menu">About Us</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>

        <Form className="search-form">
          <Form.Control
            type="search"
            placeholder="Search"
          />

          <Button variant="danger">
            🔍
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Header;