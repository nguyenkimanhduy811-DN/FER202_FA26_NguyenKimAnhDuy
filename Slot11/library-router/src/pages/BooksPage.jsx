
import { Table, Badge } from "react-bootstrap";

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Lập trình",
    status: "Còn sách",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Kỹ thuật phần mềm",
    status: "Còn sách",
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Thuật toán",
    status: "Đang mượn",
  },
];

function BooksPage() {
  return (
    <div>
      <h1 className="page-title mb-4">Danh sách sách</h1>

      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>
                <Badge
                  bg={
                    book.status === "Còn sách"
                      ? "success"
                      : "warning"
                  }
                >
                  {book.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BooksPage;
