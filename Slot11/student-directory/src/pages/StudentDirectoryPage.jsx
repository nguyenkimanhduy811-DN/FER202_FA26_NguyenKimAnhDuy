import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Table,
} from "react-bootstrap";

import { useSearchParams } from "react-router-dom";
import { STUDENTS, CLASSES } from "../data/students";

function StudentDirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc bộ lọc trực tiếp từ URL.
  const q = searchParams.get("q") ?? "";
  const selectedClass = searchParams.get("class") ?? "";

  // Cập nhật hoặc xóa một query parameter.
  function updateParam(key, value, replace = false) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value.trim() === "") {
          next.delete(key);
        } else {
          next.set(key, value);
        }

        return next;
      },
      { replace }
    );
  }

  // Tính kết quả ngay khi render, không dùng useState.
  const normalizedQuery = q.trim().toLowerCase();

  const result = STUDENTS.filter((student) => {
    const matchesQuery =
      student.name.toLowerCase().includes(normalizedQuery) ||
      student.id.toLowerCase().includes(normalizedQuery);

    const matchesClass =
      selectedClass === "" ||
      student.className === selectedClass;

    return matchesQuery && matchesClass;
  });

  // Xóa toàn bộ query string.
  function clearFilters() {
    setSearchParams({});
  }

  return (
    <Container className="py-5">
      <div className="page-heading mb-4">
        <h1 className="fw-bold">Danh bạ sinh viên FPT</h1>

        <p className="text-muted">
          Tìm kiếm theo họ tên hoặc MSSV và lọc theo lớp.
        </p>
      </div>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <div className="row g-3">
            <div className="col-md-7">
              <Form.Group controlId="studentSearch">
                <Form.Label className="fw-semibold">
                  Tìm kiếm sinh viên
                </Form.Label>

                <Form.Control
                  type="search"
                  placeholder="Nhập họ tên hoặc MSSV..."
                  value={q}
                  onChange={(e) =>
                    updateParam("q", e.target.value, true)
                  }
                />
              </Form.Group>
            </div>

            <div className="col-md-5">
              <Form.Group controlId="classFilter">
                <Form.Label className="fw-semibold">
                  Lọc theo lớp
                </Form.Label>

                <Form.Select
                  value={selectedClass}
                  onChange={(e) =>
                    updateParam("class", e.target.value)
                  }
                >
                  <option value="">Tất cả lớp</option>

                  {CLASSES.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
            <p className="mb-0 fw-semibold">
              Tìm thấy {result.length}/{STUDENTS.length} sinh viên
            </p>

            <Button
              type="button"
              variant="outline-secondary"
              onClick={clearFilters}
            >
              Xóa lọc
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table
            striped
            bordered
            hover
            responsive
            className="mb-0"
          >
            <thead className="table-primary">
              <tr>
                <th>STT</th>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>Lớp</th>
                <th>GPA</th>
              </tr>
            </thead>

            <tbody>
              {result.length > 0 ? (
                result.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.className}</td>
                    <td>{student.gpa.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Không có sinh viên phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentDirectoryPage;