import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function App() {
  return (
    <Container className="py-5">
      <Card className="shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
        <Card.Body className="text-center p-5">
          <Card.Title className="fs-2 fw-bold mb-3">
            useReducer Exercises
          </Card.Title>

          <Card.Text className="text-muted">
            React useReducer practice
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;