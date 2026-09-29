import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Badge from 'react-bootstrap/Badge';

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Hook nào dùng để lưu trạng thái cục bộ?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    answer: 1
  },
  {
    id: 'q2',
    text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?',
    options: ['1', '2', '3', '0'],
    answer: 0
  },
  {
    id: 'q3',
    text: 'Cách đúng để thêm phần tử vào mảng state?',
    options: [
      'list.push(x)',
      'setList(list.push(x))',
      'setList([...list, x])',
      'list[list.length] = x'
    ],
    answer: 2
  },
  {
    id: 'q4',
    text: 'Checkbox có điều khiển dùng prop nào?',
    options: ['value', 'checked', 'selected', 'defaultValue'],
    answer: 1
  }
];

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [
      result[j],
      result[i]
    ];
  }

  return result;
}

function Quiz({ onRestart }) {
  // Lazy initializer:
  // shuffle chỉ chạy một lần khi Quiz được tạo.
  const [questions] = useState(
    () => shuffle(QUESTIONS)
  );

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;

  const score = questions.filter(
    (question) =>
      answers[question.id] === question.answer
  ).length;

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: optionIndex
    }));
  };

  const handlePrevious = () => {
    setIndex((i) => i - 1);
  };

  const handleNext = () => {
    setIndex((i) => i + 1);
  };

  const handleSubmit = () => {
    setFinished(true);
  };

  // Sau khi gọi đủ useState mới return sớm.
  if (finished) {
    return (
      <Card className="quiz-card shadow">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <Badge
              bg="primary"
              className="mb-3 quiz-badge"
            >
              Hoàn thành
            </Badge>

            <h1 className="quiz-title">
              Bạn đúng {score}/{questions.length} câu
            </h1>

            <p className="text-muted">
              Xem lại kết quả của bạn bên dưới.
            </p>
          </div>

          <div className="quiz-results">
            {questions.map((question, questionIndex) => {
              const userAnswer =
                answers[question.id];

              const isCorrect =
                userAnswer === question.answer;

              return (
                <Card
                  key={question.id}
                  className={
                    isCorrect
                      ? 'result-card correct'
                      : 'result-card wrong'
                  }
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                      <h5 className="mb-0">
                        Câu {questionIndex + 1}:{' '}
                        {question.text}
                      </h5>

                      <Badge
                        bg={
                          isCorrect
                            ? 'success'
                            : 'danger'
                        }
                      >
                        {isCorrect
                          ? 'Đúng'
                          : 'Sai'}
                      </Badge>
                    </div>

                    <div className="result-line">
                      <span className="result-label">
                        Bạn chọn:
                      </span>

                      <span
                        className={
                          isCorrect
                            ? 'answer-correct'
                            : 'answer-wrong'
                        }
                      >
                        {question.options[userAnswer]}
                      </span>
                    </div>

                    <div className="result-line">
                      <span className="result-label">
                        Đáp án đúng:
                      </span>

                      <span className="answer-correct">
                        {question.options[
                          question.answer
                        ]}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onRestart}
            >
              Làm lại
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  const progress =
    (answeredCount / questions.length) * 100;

  return (
    <Card className="quiz-card shadow">
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">
            Câu {index + 1}/{questions.length}
          </span>

          <span className="text-muted">
            Đã trả lời {answeredCount}/
            {questions.length}
          </span>
        </div>

        <ProgressBar
          now={progress}
          className="quiz-progress mb-4"
        />

        <h2 className="question-title">
          Câu {index + 1}: {current.text}
        </h2>

        <div className="options-list">
          {current.options.map(
            (option, optionIndex) => {
              const isSelected =
                selected === optionIndex;

              return (
                <button
                  type="button"
                  key={option}
                  className={
                    isSelected
                      ? 'option-button selected'
                      : 'option-button'
                  }
                  onClick={() =>
                    selectAnswer(optionIndex)
                  }
                >
                  <span className="option-index">
                    {String.fromCharCode(
                      65 + optionIndex
                    )}
                  </span>

                  <span>{option}</span>
                </button>
              );
            }
          )}
        </div>

        <div className="quiz-actions">
          <Button
            variant="outline-secondary"
            onClick={handlePrevious}
            disabled={index === 0}
          >
            ← Trước
          </Button>

          {index < questions.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={selected === undefined}
            >
              Tiếp →
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={
                answeredCount !== questions.length
              }
            >
              Nộp bài
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

function QuizApp() {
  const [attempt, setAttempt] = useState(1);

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="text-center mb-4">
          <h1 className="main-quiz-title">
            Quiz Trắc Nghiệm
          </h1>

          <p className="attempt-text">
            Lượt làm bài thứ {attempt}
          </p>
        </div>

        <Quiz
          key={attempt}
          onRestart={() =>
            setAttempt((a) => a + 1)
          }
        />
      </div>
    </div>
  );
}

export default QuizApp;