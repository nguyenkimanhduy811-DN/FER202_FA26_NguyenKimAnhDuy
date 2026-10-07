import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  initialTodos,
  FILTERS
} from '../data/todoData';

const MAX_TITLE_LENGTH = 60;

function TodoList() {
  const [todos, setTodos] =
    useState(initialTodos);

  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] =
    useState(null);
  const [editText, setEditText] = useState('');

  const validateTitle = (
    text,
    ignoreId = null
  ) => {
    const value = text.trim();

    if (!value) {
      return 'Nội dung không được để trống';
    }

    if (value.length > MAX_TITLE_LENGTH) {
      return `Nội dung không được quá ${MAX_TITLE_LENGTH} ký tự`;
    }

    const duplicate = todos.some(
      (todo) =>
        todo.id !== ignoreId &&
        todo.title.trim().toLowerCase() ===
          value.toLowerCase()
    );

    if (duplicate) {
      return 'Công việc đã tồn tại';
    }

    return '';
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const newError = validateTitle(title);

    if (newError) {
      setError(newError);
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      done: false
    };

    setTodos((prev) => [
      ...prev,
      newTodo
    ]);

    setTitle('');
    setError('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    if (error) {
      setError('');
    }
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done
            }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter(
        (todo) => todo.id !== id
      )
    );

    if (editingId === id) {
      setEditingId(null);
      setEditText('');
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (editingId === null) {
      return;
    }

    const newError = validateTitle(
      editText,
      editingId
    );

    if (newError) {
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId
          ? {
              ...todo,
              title: editText.trim()
            }
          : todo
      )
    );

    setEditingId(null);
    setEditText('');
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    }

    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const clearCompleted = () => {
    setTodos((prev) =>
      prev.filter((todo) => !todo.done)
    );
  };

  const visibleTodos = todos.filter(
    (todo) => {
      if (filter === 'active') {
        return !todo.done;
      }

      if (filter === 'completed') {
        return todo.done;
      }

      return true;
    }
  );

  const remaining = todos.filter(
    (todo) => !todo.done
  ).length;

  const hasCompleted = todos.some(
    (todo) => todo.done
  );

  return (
    <div className="todo-page">
      <div className="todo-container">
        <Card className="todo-card shadow-sm">
          <Card.Body className="p-4">
            <div className="todo-heading">
              <h1>Todo List</h1>
              <p>
                Quản lý công việc với useState
              </p>
            </div>

            <Form
              noValidate
              onSubmit={handleAdd}
            >
              <div className="todo-add-row">
                <Form.Control
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  isInvalid={Boolean(error)}
                  placeholder="Nhập công việc..."
                />

                <Button
                  type="submit"
                  variant="primary"
                >
                  Thêm
                </Button>
              </div>

              {error && (
                <div className="todo-error">
                  {error}
                </div>
              )}
            </Form>

            <div className="todo-filter-row">
              <div className="filter-buttons">
                {Object.entries(FILTERS).map(
                  ([key, label]) => (
                    <Button
                      key={key}
                      variant={
                        filter === key
                          ? 'primary'
                          : 'outline-primary'
                      }
                      size="sm"
                      onClick={() =>
                        setFilter(key)
                      }
                    >
                      {label}
                    </Button>
                  )
                )}
              </div>

              {hasCompleted && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={clearCompleted}
                >
                  Xóa việc đã xong
                </Button>
              )}
            </div>

            <div className="todo-remaining">
              Còn {remaining} việc chưa xong
            </div>

            <div className="todo-list">
              {visibleTodos.length === 0 ? (
                <div className="todo-empty">
                  Không có công việc
                </div>
              ) : (
                visibleTodos.map((todo) => (
                  <div
                    className="todo-item"
                    key={todo.id}
                  >
                    <Form.Check
                      type="checkbox"
                      checked={todo.done}
                      onChange={() =>
                        toggleTodo(todo.id)
                      }
                      aria-label={`Hoàn thành ${todo.title}`}
                    />

                    <div className="todo-content">
                      {editingId === todo.id ? (
                        <>
                          <Form.Control
                            autoFocus
                            type="text"
                            value={editText}
                            onChange={(e) =>
                              setEditText(
                                e.target.value
                              )
                            }
                            onKeyDown={
                              handleEditKeyDown
                            }
                            onBlur={() => {
                              const editError =
                                validateTitle(
                                  editText,
                                  editingId
                                );

                              if (!editError) {
                                saveEdit();
                              }
                            }}
                            isInvalid={Boolean(
                              validateTitle(
                                editText,
                                editingId
                              )
                            )}
                          />

                          <Form.Control.Feedback type="invalid">
                            {validateTitle(
                              editText,
                              editingId
                            )}
                          </Form.Control.Feedback>
                        </>
                      ) : (
                        <span
                          className={
                            todo.done
                              ? 'todo-title done'
                              : 'todo-title'
                          }
                          onDoubleClick={() =>
                            startEdit(todo)
                          }
                          title="Nhấp đúp để sửa"
                        >
                          {todo.title}
                        </span>
                      )}
                    </div>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        deleteTodo(todo.id)
                      }
                    >
                      Xóa
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default TodoList;