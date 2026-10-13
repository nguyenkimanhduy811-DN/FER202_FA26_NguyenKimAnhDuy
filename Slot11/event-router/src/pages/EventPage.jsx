import { Button, Card, Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EventPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container className="py-5">
      <Card className="event-card shadow">
        <Card.Body className="p-4 p-md-5 text-center">
          <Badge bg="primary" className="mb-3">
            SỰ KIỆN CÔNG NGHỆ 2026
          </Badge>

          <h1 className="display-4 fw-bold">
            FPTU Tech Day 2026
          </h1>

          <p className="lead text-muted mt-3">
            Ngày hội công nghệ dành cho sinh viên FPT University.
          </p>

          <p>
            Cùng khám phá công nghệ mới, giao lưu và chia sẻ
            ý tưởng sáng tạo trong lĩnh vực công nghệ thông tin.
          </p>

          <div className="event-info my-4">
            <p>
              <strong>Thời gian:</strong> Năm 2026
            </p>
            <p className="mb-0">
              <strong>Đối tượng:</strong> Sinh viên và người yêu công nghệ
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleRegister}
          >
            Đăng ký ngay
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventPage;