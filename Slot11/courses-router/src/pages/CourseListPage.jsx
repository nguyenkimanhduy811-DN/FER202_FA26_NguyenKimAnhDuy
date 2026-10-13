import { Container, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";

function CourseListPage() {
  return (
    <Container className="py-5">
      <h1 className="page-title mb-2">Danh sách môn học</h1>

      <p className="text-muted mb-4">
        Chọn mã môn học để xem thông tin chi tiết.
      </p>

      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>STT</th>
            <th>Mã môn</th>
            <th>Tên môn học</th>
            <th>Số tín chỉ</th>
            <th>Học kỳ</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course, index) => (
            <tr key={course.code}>
              <td>{index + 1}</td>

              <td>
                <Link
                  to={`/courses/${course.code}`}
                  className="course-link fw-bold"
                >
                  {course.code}
                </Link>
              </td>

              <td>{course.name}</td>

              <td>
                <Badge bg="primary">{course.credits} tín chỉ</Badge>
              </td>

              <td>{course.semester}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CourseListPage;