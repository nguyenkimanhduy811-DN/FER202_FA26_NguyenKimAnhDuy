
import { Accordion } from "react-bootstrap";

function FaqPage() {
  return (
    <div>
      <h2 className="mb-3">Câu hỏi thường gặp</h2>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Sinh viên có thể mượn sách ở đâu?
          </Accordion.Header>
          <Accordion.Body>
            Sinh viên có thể đến thư viện để tra cứu và mượn sách
            theo quy định của thư viện.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Làm thế nào để tìm sách?
          </Accordion.Header>
          <Accordion.Body>
            Chọn mục Sách trên thanh điều hướng để xem danh sách
            các cuốn sách trong hệ thống.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Sinh viên cần làm gì khi trả sách?
          </Accordion.Header>
          <Accordion.Body>
            Sinh viên cần trả sách đúng hạn và bảo quản sách
            trong quá trình sử dụng.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FaqPage;
