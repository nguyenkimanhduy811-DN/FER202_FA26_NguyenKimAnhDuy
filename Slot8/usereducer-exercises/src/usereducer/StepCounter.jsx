import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

import {
  MIN,
  MAX,
  ACTIONS,
  initialState,
  STEP_OPTIONS
} from '../data/stepCounterData';

const clamp = (n) => {
  return Math.min(MAX, Math.max(MIN, n));
};

function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta =
        action.type === ACTIONS.INCREMENT
          ? state.step
          : -state.step;

      const next = clamp(state.count + delta);

      if (next === state.count) {
        return state;
      }

      return {
        ...state,
        count: next,
        history: [
          `${state.count} → ${next}`,
          ...state.history
        ].slice(0, 5)
      };
    }

    case ACTIONS.SET_STEP:
      return {
        ...state,
        step: action.payload
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      throw new Error(
        `Unknown action: ${action.type}`
      );
  }
}

function StepCounter() {
  const [state, dispatch] = useReducer(
    counterReducer,
    initialState
  );

  const { count, step, history } = state;

  return (
    <div className="step-counter-page">
      <Card className="step-counter-card shadow-sm">
        <Card.Body className="p-4 p-md-5">

          <div className="text-center mb-4">
            <h1 className="step-counter-title">
              Step Counter
            </h1>

            <p className="text-muted mb-0">
              Bộ đếm với bước nhảy và lịch sử
            </p>
          </div>

          <div className="counter-display">
            <div className="counter-label">
              Giá trị hiện tại
            </div>

            <div className="counter-number">
              {count}
            </div>

            <Badge
              bg="primary"
              className="counter-badge"
            >
              Step: {step}
            </Badge>
          </div>

          <div className="counter-actions">
            <Button
              variant="outline-danger"
              size="lg"
              onClick={() =>
                dispatch({
                  type: ACTIONS.DECREMENT
                })
              }
              disabled={count === MIN}
            >
              − {step}
            </Button>

            <Button
              variant="outline-success"
              size="lg"
              onClick={() =>
                dispatch({
                  type: ACTIONS.INCREMENT
                })
              }
              disabled={count === MAX}
            >
              + {step}
            </Button>
          </div>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              Bước nhảy
            </Form.Label>

            <Form.Select
              value={step}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.SET_STEP,
                  payload: Number(e.target.value)
                })
              }
            >
              {STEP_OPTIONS.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button
            variant="secondary"
            className="w-100 mb-4"
            onClick={() =>
              dispatch({
                type: ACTIONS.RESET
              })
            }
          >
            Đặt lại
          </Button>

          <div className="history-section">
            <div className="history-title">
              5 thay đổi gần nhất
            </div>

            {history.length === 0 ? (
              <div className="history-empty">
                Chưa có thay đổi nào.
              </div>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <div
                    className="history-item"
                    key={`${item}-${index}`}
                  >
                    <span className="history-number">
                      {index + 1}
                    </span>

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </Card.Body>
      </Card>
    </div>
  );
}

export default StepCounter;