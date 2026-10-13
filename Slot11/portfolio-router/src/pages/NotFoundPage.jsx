import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>

      <h2>Không tìm thấy trang</h2>

      <p className="text-muted">
        Đường dẫn bạn truy cập không tồn tại.
      </p>

      <Button as={Link} to="/" variant="primary">
        Quay về trang chủ
      </Button>
    </Container>
  );
}

export default NotFoundPage;