import { Alert, Badge, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { findCourse } from "../utils/courseUtils";

function CourseDetailPage() {
  const { code } = useParams();

  const course = findCourse(code);

  // Nếu mã môn không tồn tại, hiển thị thông báo thay vì trang trắng.
  if (!course) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Không tìm thấy môn học có mã {code}
        </Alert>

        <Link to="/courses" className="back-link">
          ← Quay lại danh sách
        </Link>
      </Container>
    );
  }

  // Nếu tìm thấy môn học, hiển thị thông tin chi tiết.
  return (
    <Container className="py-5">
      <Card className="course-detail-card shadow-sm">
        <Card.Header className="bg-primary text-white py-3">
          <h2 className="mb-0">Chi tiết môn học</h2>
        </Card.Header>

        <Card.Body className="p-4">
          <div className="mb-3">
            <Badge bg="primary" className="course-code">
              {course.code}
            </Badge>
          </div>

          <Card.Title className="fs-3 mb-4">
            {course.name}
          </Card.Title>

          <p>
            <strong>Mã môn học:</strong> {course.code}
          </p>

          <p>
            <strong>Học kỳ:</strong> {course.semester}
          </p>

          <p>
            <strong>Số tín chỉ:</strong> {course.credits}
          </p>

          <div className="course-description mt-4">
            <h5>Mô tả môn học</h5>
            <p className="text-muted mb-0">{course.desc}</p>
          </div>

          <div className="mt-4">
            <Link to="/courses" className="back-link">
              ← Quay lại danh sách
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CourseDetailPage;