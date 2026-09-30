import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import {
  TRANSITIONS,
  STATUS_INFO,
  EVENT_LABELS,
  initialState
} from '../data/orderData';

function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_REASON':
      return {
        ...state,
        cancelReason: action.payload,
        error: ''
      };

    case 'RESET':
      return initialState;

    default: {
      const next =
        TRANSITIONS[state.status]?.[action.type];

      if (!next) {
        return {
          ...state,
          error: `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"`
        };
      }

      if (
        action.type === 'CANCEL' &&
        state.cancelReason.trim().length < 5
      ) {
        return {
          ...state,
          error:
            'Nhập lý do hủy (ít nhất 5 ký tự)'
        };
      }

      return {
        ...state,
        status: next,
        error: '',
        timeline: [
          ...state.timeline,
          {
            status: next,
            at: action.at
          }
        ]
      };
    }
  }
}

function now() {
  return new Date().toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function OrderTracker() {
  const [state, dispatch] = useReducer(
    orderReducer,
    initialState
  );

  const {
    status,
    cancelReason,
    error,
    timeline
  } = state;

  const allowedEvents =
    Object.keys(TRANSITIONS[status]);

  const isFinal =
    allowedEvents.length === 0;

  const statusInfo = STATUS_INFO[status];

  const handleEvent = (event) => {
    dispatch({
      type: event,
      at: now()
    });
  };

  return (
    <div className="order-page">
      <div className="order-container">

        <div className="text-center mb-4">
          <h1 className="order-title">
            Theo dõi đơn hàng
          </h1>

          <p className="text-muted mb-0">
            Đơn hàng #DH1024
          </p>
        </div>

        <Card className="order-card shadow-sm">
          <Card.Body className="p-4">

            {/* Trạng thái */}
            <div className="order-status">
              <div>
                <div className="status-caption">
                  Trạng thái hiện tại
                </div>

                <div className="status-name">
                  {statusInfo.label}
                </div>
              </div>

              <Badge
                bg={statusInfo.variant}
                className="status-badge"
              >
                {statusInfo.label}
              </Badge>
            </div>

            {/* Lỗi */}
            {error && (
              <Alert
                variant="danger"
                className="mt-3 mb-3"
              >
                {error}
              </Alert>
            )}

            {/* Lý do hủy */}
            {allowedEvents.includes('CANCEL') && (
              <Form.Group className="mb-4">
                <Form.Label>
                  Lý do hủy
                </Form.Label>

                <Form.Control
                  type="text"
                  value={cancelReason}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_REASON',
                      payload: e.target.value
                    })
                  }
                  placeholder="Nhập lý do hủy..."
                />
              </Form.Group>
            )}

            {/* Nút sự kiện */}
            <div className="event-section">
              <div className="section-label">
                Sự kiện
              </div>

              <div className="event-grid">
                {Object.keys(EVENT_LABELS).map(
                  (event) => (
                    <Button
                      key={event}
                      variant={
                        event === 'CANCEL'
                          ? 'outline-danger'
                          : 'outline-primary'
                      }
                      disabled={
                        !allowedEvents.includes(event)
                      }
                      onClick={() =>
                        handleEvent(event)
                      }
                    >
                      {EVENT_LABELS[event]}
                    </Button>
                  )
                )}
              </div>

              {/* Nút thử SHIP luôn hoạt động */}
              <Button
                variant="dark"
                className="test-ship-button"
                onClick={() => handleEvent('SHIP')}
              >
                Thử gửi SHIP
              </Button>
            </div>

            {/* Timeline */}
            <div className="timeline-section">
              <div className="section-label">
                Dòng thời gian
              </div>

              <div className="timeline">
                {timeline.map((item, index) => {
                  const info =
                    STATUS_INFO[item.status];

                  return (
                    <div
                      className="timeline-item"
                      key={`${item.status}-${item.at}-${index}`}
                    >
                      <div className="timeline-dot" />

                      <div className="timeline-content">
                        <div className="timeline-status">
                          {info.label}
                        </div>

                        <div className="timeline-time">
                          {item.at}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tạo đơn mới */}
            {isFinal && (
              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  onClick={() =>
                    dispatch({ type: 'RESET' })
                  }
                >
                  Tạo đơn mới
                </Button>
              </div>
            )}

          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default OrderTracker;