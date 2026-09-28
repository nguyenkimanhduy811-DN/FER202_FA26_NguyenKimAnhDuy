import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function TodoList() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (todo.trim() === '') {
      return;
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todo.trim()
      }
    ]);

    setTodo('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(
      todos.filter((item) => item.id !== id)
    );
  };

  return (
    <Card
      className="shadow mx-auto"
      style={{ maxWidth: '600px' }}
    >
      <Card.Body className="p-4">
        <Card.Title className="text-center fs-2 mb-4">
          Todo List
        </Card.Title>

        <Form onSubmit={handleAddTodo}>
          <div className="d-flex gap-2 mb-4">
            <Form.Control
              type="text"
              value={todo}
              onChange={(event) =>
                setTodo(event.target.value)
              }
              placeholder="Add a new todo..."
            />

            <Button
              type="submit"
              variant="primary"
            >
              Add
            </Button>
          </div>
        </Form>

        <ListGroup>
          {todos.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{item.text}</span>

              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  handleDeleteTodo(item.id)
                }
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {todos.length === 0 && (
          <p className="text-muted text-center mt-3 mb-0">
            No todos yet.
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

export default TodoList;