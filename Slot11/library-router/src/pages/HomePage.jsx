
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-section text-center">
      <h1 className="display-5 fw-bold">
        Chào mừng đến với thư viện FPT University
      </h1>

      <p className="lead text-muted mt-3">
        Khám phá sách, tài liệu học tập và hướng dẫn dành cho sinh viên.
      </p>

      <Button
        as={Link}
        to="/books"
        variant="primary"
        size="lg"
        className="mt-3"
      >
        Xem danh sách sách
      </Button>
    </div>
  );
}

export default HomePage;
