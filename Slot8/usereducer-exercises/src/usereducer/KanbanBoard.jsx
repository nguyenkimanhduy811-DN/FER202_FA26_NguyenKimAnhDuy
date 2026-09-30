import { useReducer, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import {
  COLUMNS,
  initialTaskState
} from '../data/taskData';

import {
  taskReducer,
  addTask,
  moveTask,
  renameTask,
  deleteTask,
  clearDone
} from './taskReducer';

function TaskCard({
  task,
  isFirst,
  isLast,
  dispatch
}) {
  const handleRename = () => {
    const newTitle = window.prompt(
      'Nhập tên công việc mới:',
      task.title
    );

    if (newTitle === null) {
      return;
    }

    dispatch(renameTask(task.id, newTitle));
  };

  return (
    <Card className="task-card">
      <Card.Body className="p-3">
        <div
          className="task-title"
          onDoubleClick={handleRename}
          title="Nhấp đúp để đổi tên"
        >
          {task.title}
        </div>

        <div className="task-info">
          <Badge
            bg={
              task.priority === 'high'
                ? 'danger'
                : 'secondary'
            }
          >
            {task.priority === 'high'
              ? 'Cao'
              : 'Thấp'}
          </Badge>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() =>
              dispatch(deleteTask(task.id))
            }
          >
            Xóa
          </Button>
        </div>

        <div className="task-move-buttons">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={isFirst}
            onClick={() =>
              dispatch(moveTask(task.id, -1))
            }
          >
            ←
          </Button>

          <Button
            variant="outline-primary"
            size="sm"
            disabled={isLast}
            onClick={() =>
              dispatch(moveTask(task.id, 1))
            }
          >
            →
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function KanbanBoard() {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState
  );

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [filter, setFilter] = useState('all');

  const visible =
    filter === 'all'
      ? state.tasks
      : state.tasks.filter(
          (task) => task.priority === filter
        );

  const doneCount = state.tasks.filter(
    (task) => task.column === 'done'
  ).length;

  const handleAdd = (event) => {
    event.preventDefault();

    const newTitle = title.trim();

    if (!newTitle) {
      return;
    }

    dispatch(addTask(newTitle, priority));
    setTitle('');
  };

  return (
    <div className="kanban-page">
      <div className="kanban-container">

        <div className="kanban-heading">
          <h1>Kanban Board</h1>
          <p>
            Quản lý công việc bằng useReducer
          </p>
        </div>

        <Card className="toolbar-card shadow-sm mb-4">
          <Card.Body>

            <Form onSubmit={handleAdd}>
              <div className="toolbar-row">
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Nhập tên công việc..."
                />

                <Form.Select
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value)
                  }
                >
                  <option value="low">
                    Ưu tiên thấp
                  </option>

                  <option value="high">
                    Ưu tiên cao
                  </option>
                </Form.Select>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={!title.trim()}
                >
                  Thêm
                </Button>
              </div>
            </Form>

            <div className="toolbar-bottom">
              <Form.Select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value)
                }
              >
                <option value="all">
                  Tất cả
                </option>

                <option value="high">
                  Chỉ ưu tiên cao
                </option>

                <option value="low">
                  Chỉ ưu tiên thấp
                </option>
              </Form.Select>

              <Button
                variant="outline-danger"
                onClick={() =>
                  dispatch(clearDone())
                }
                disabled={doneCount === 0}
              >
                Dọn cột xong
              </Button>
            </div>

          </Card.Body>
        </Card>

        <div className="kanban-columns">
          {COLUMNS.map((column, columnIndex) => {
            const columnTasks = visible.filter(
              (task) => task.column === column.id
            );

            return (
              <div
                className="kanban-column"
                key={column.id}
              >
                <div className="column-header">
                  <span className="column-title">
                    {column.title}
                  </span>

                  <Badge bg="secondary">
                    {columnTasks.length}
                  </Badge>
                </div>

                <div className="column-body">
                  {columnTasks.length === 0 ? (
                    <div className="empty-column">
                      Không có công việc
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isFirst={columnIndex === 0}
                        isLast={
                          columnIndex ===
                          COLUMNS.length - 1
                        }
                        dispatch={dispatch}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default KanbanBoard;