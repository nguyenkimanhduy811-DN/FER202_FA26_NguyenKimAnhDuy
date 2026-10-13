
import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function HelpLayout() {
  return (
    <div>
      <h1 className="page-title mb-4">
        Trung tâm hướng dẫn
      </h1>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link as={NavLink} to="faq" end>
            Câu hỏi thường gặp
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={NavLink} to="rules" end>
            Nội quy
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
    </div>
  );
}

export default HelpLayout;
