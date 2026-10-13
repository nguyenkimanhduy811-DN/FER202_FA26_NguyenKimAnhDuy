
import { ListGroup } from "react-bootstrap";

function RulesPage() {
  return (
    <div>
      <h2 className="mb-3">Nội quy thư viện</h2>

      <ListGroup numbered>
        <ListGroup.Item>
          Giữ trật tự và vệ sinh trong thư viện.
        </ListGroup.Item>

        <ListGroup.Item>
          Bảo quản sách và tài liệu được mượn.
        </ListGroup.Item>

        <ListGroup.Item>
          Trả sách đúng thời hạn quy định.
        </ListGroup.Item>

        <ListGroup.Item>
          Không làm hư hỏng hoặc tự ý mang tài liệu ra ngoài
          trái quy định.
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default RulesPage;
