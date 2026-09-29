import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

const CITIES = [
  'Hà Nội',
  'Đà Nẵng',
  'TP.HCM',
  'Cần Thơ'
];

const initialStudents = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    score: 8.5,
    contact: {
      city: 'Hà Nội'
    }
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    score: 4.5,
    contact: {
      city: 'Đà Nẵng'
    }
  },
  {
    id: 3,
    name: 'Lê Minh Châu',
    score: 6,
    contact: {
      city: 'TP.HCM'
    }
  }
];

function StudentManager() {
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const addStudent = (event) => {
    event.preventDefault();

    const name = newName.trim();

    if (name.length < 3) {
      return;
    }

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        score: 0,
        contact: {
          city: CITIES[0]
        }
      }
    ]);

    setNewName('');
  };

  const updateScore = (id, text) => {
    const value = Number(text);

    const score = Number.isNaN(value)
      ? 0
      : Math.min(10, Math.max(0, value));

    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, score }
          : s
      )
    );
  };

  const updateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              contact: {
                ...s.contact,
                city
              }
            }
          : s
      )
    );
  };

  const removeStudent = (id) => {
    setStudents((prev) =>
      prev.filter((s) => s.id !== id)
    );
  };

  const bonusAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: Math.min(10, s.score + 0.5)
      }))
    );
  };

  const sorted =
    sortBy === 'none'
      ? students
      : [...students].sort((a, b) => {
          if (sortBy === 'name') {
            return a.name.localeCompare(
              b.name,
              'vi'
            );
          }

          if (sortBy === 'score') {
            return b.score - a.score;
          }

          return 0;
        });

  const average =
    students.length === 0
      ? '0.00'
      : (
          students.reduce(
            (sum, student) =>
              sum + student.score,
            0
          ) / students.length
        ).toFixed(2);

  const passed = students.filter(
    (student) => student.score >= 5
  ).length;

  return (
    <div className="student-page">
      <div className="student-container">
        <h1 className="text-center mb-2">
          Quản lý điểm sinh viên
        </h1>

        <p className="text-center text-muted mb-4">
          Quản lý sinh viên, điểm số và thành phố
        </p>

        {/* Thêm sinh viên */}
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Form onSubmit={addStudent}>
              <div className="student-add-row">
                <Form.Control
                  type="text"
                  value={newName}
                  onChange={(event) =>
                    setNewName(event.target.value)
                  }
                  placeholder="Nhập họ tên sinh viên..."
                />

                <Button
                  type="submit"
                  variant="primary"
                  disabled={newName.trim().length < 3}
                >
                  Thêm
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Bộ điều khiển */}
        <div className="student-toolbar">
          <Form.Select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="none">
              Thứ tự nhập
            </option>

            <option value="name">
              Theo tên A → Z
            </option>

            <option value="score">
              Điểm cao → thấp
            </option>
          </Form.Select>

          <Button
            variant="success"
            onClick={bonusAll}
            disabled={students.length === 0}
          >
            +0.5 cả lớp
          </Button>
        </div>

        {/* Bảng */}
        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <Table
              striped
              bordered
              hover
              responsive
              className="mb-0 student-table"
            >
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Điểm</th>
                  <th>Thành phố</th>
                  <th>Kết quả</th>
                  <th>Xóa</th>
                </tr>
              </thead>

              <tbody>
                {sorted.map((student) => (
                  <tr key={student.id}>
                    <td className="student-name">
                      {student.name}
                    </td>

                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={student.score}
                        onChange={(event) =>
                          updateScore(
                            student.id,
                            event.target.value
                          )
                        }
                        className="score-input"
                      />
                    </td>

                    <td>
                      <Form.Select
                        value={student.contact.city}
                        onChange={(event) =>
                          updateCity(
                            student.id,
                            event.target.value
                          )
                        }
                      >
                        {CITIES.map((city) => (
                          <option
                            key={city}
                            value={city}
                          >
                            {city}
                          </option>
                        ))}
                      </Form.Select>
                    </td>

                    <td>
                      {student.score >= 5 ? (
                        <Badge bg="success">
                          Đạt
                        </Badge>
                      ) : (
                        <Badge bg="danger">
                          Chưa đạt
                        </Badge>
                      )}
                    </td>

                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          removeStudent(student.id)
                        }
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-muted"
                    >
                      Chưa có sinh viên
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Thống kê */}
        <Card className="shadow-sm mt-4">
          <Card.Body className="student-summary">
            <span>
              Sĩ số: <strong>{students.length}</strong>
            </span>

            <span>
              Điểm trung bình:{' '}
              <strong>{average}</strong>
            </span>

            <span>
              Đạt:{' '}
              <strong>
                {passed}/{students.length}
              </strong>
            </span>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default StudentManager;