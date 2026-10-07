import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';

function App() {
  return (
    <Container className="app-container py-5">
      <div className="page-heading">
        <h1>Bài 1: Bộ chọn số lượng và giỏ hàng mini</h1>
        <p>
          Thực hành useState với state số và mảng object
        </p>
      </div>

      <Card className="section-card shadow-sm">
        <Card.Body>
          <h2 className="section-title">
            Phần 1: QuantityPicker
          </h2>

          <div className="quantity-picker-list">
            <QuantityPicker />

            <QuantityPicker
              min={2}
              max={5}
            />
          </div>
        </Card.Body>
      </Card>

      <Card className="section-card shadow-sm">
        <Card.Body>
          <MiniCart />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;