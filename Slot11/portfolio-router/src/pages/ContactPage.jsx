import { Container, Card } from "react-bootstrap";

function ContactPage() {
  return (
    <Container className="py-5">
      <h2 className="section-title mb-4">Liên hệ với tôi</h2>

      <Card className="shadow-sm">
        <Card.Body>
          <p>
            <strong>Họ tên:</strong> Nguyễn Kim Anh Duy
          </p>

          <p>
            <strong>Email:</strong> your-email@example.com
          </p>

          <p className="mb-0">
            <strong>Mục tiêu:</strong> Tìm hiểu và phát triển kỹ năng
            lập trình Web Front-end.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ContactPage;