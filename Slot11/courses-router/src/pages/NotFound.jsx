import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>

      <h2>Không tìm thấy trang</h2>

      <p className="text-muted">
        Đường dẫn bạn truy cập không tồn tại.
      </p>

      <Button as={Link} to="/courses" variant="primary">
        Quay lại danh sách môn học
      </Button>
    </Container>
  );
}

export default NotFound;