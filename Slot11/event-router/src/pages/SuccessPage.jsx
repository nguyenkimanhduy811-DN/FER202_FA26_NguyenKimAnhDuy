import {
  Alert,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // Không có dữ liệu đăng ký thì chuyển về trang đăng ký.
  if (!data) {
    return <Navigate to="/register" replace />;
  }

  return (
    <Container className="py-5">
      <Card className="success-card shadow-sm">
        <Card.Body className="p-4 p-md-5 text-center">
          <div className="success-icon mb-3">✓</div>

          <h1 className="text-success fw-bold">
            Đăng ký thành công!
          </h1>

          <Alert variant="success" className="text-start mt-4">
            <p className="mb-2">
              Cảm ơn {data.name}, vé đã gửi tới {data.email}
            </p>

            <p className="mb-0">
              <strong>Buổi tham dự:</strong> {data.session}
            </p>
          </Alert>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
            <Button
              variant="primary"
              onClick={() =>
                navigate("/register", { replace: true })
              }
            >
              Đăng ký thêm người khác
            </Button>

            <Button
              as={Link}
              to="/"
              variant="outline-secondary"
            >
              Về trang sự kiện
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SuccessPage;