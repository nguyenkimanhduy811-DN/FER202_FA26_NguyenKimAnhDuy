import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const faqs = [
  {
    id: 1,
    question: 'React là gì?',
    answer:
      'Thư viện JavaScript để xây dựng giao diện người dùng theo component.'
  },
  {
    id: 2,
    question: 'State khác props thế nào?',
    answer:
      'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.'
  },
  {
    id: 3,
    question: 'Vì sao phải dùng setState?',
    answer:
      'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.'
  }
];

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="faq-card">
      <Card.Header
        role="button"
        onClick={() => setIsOpen((open) => !open)}
        className="faq-header"
      >
        <span>{question}</span>

        <span className="faq-icon">
          {isOpen ? '−' : '+'}
        </span>
      </Card.Header>

      {isOpen && (
        <Card.Body className="faq-answer">
          {answer}
        </Card.Body>
      )}
    </Card>
  );
}

function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false);
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) =>
      current === id ? null : id
    );
  };

  const handleModeChange = (event) => {
    setSingleMode(event.target.checked);
    setOpenId(null);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">

        <div className="text-center mb-4">
          <h1 className="faq-title">FAQ Accordion</h1>
          <p className="faq-subtitle">
            Frequently Asked Questions
          </p>
        </div>

        <div className="faq-toolbar">
          <Form.Check
            type="switch"
            id="single-mode"
            label="Chỉ mở một câu tại một thời điểm"
            checked={singleMode}
            onChange={handleModeChange}
          />

          <Button
            variant="outline-secondary"
            disabled={!singleMode || openId === null}
            onClick={() => setOpenId(null)}
          >
            Đóng tất cả
          </Button>
        </div>

        {!singleMode &&
          faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}

        {singleMode &&
          faqs.map(({ id, question, answer }) => {
            const isOpen = openId === id;

            return (
              <Card className="faq-card" key={id}>
                <Card.Header
                  role="button"
                  onClick={() => handleToggle(id)}
                  className="faq-header"
                >
                  <span>{question}</span>

                  <span className="faq-icon">
                    {isOpen ? '−' : '+'}
                  </span>
                </Card.Header>

                {isOpen && (
                  <Card.Body className="faq-answer">
                    {answer}
                  </Card.Body>
                )}
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default FaqAccordion;