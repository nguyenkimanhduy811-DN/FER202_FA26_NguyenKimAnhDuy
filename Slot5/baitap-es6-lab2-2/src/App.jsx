import Card from 'react-bootstrap/Card';
import AppButton from './components/AppButton';
import InputField from './components/InputField';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import { products } from './data/products';
import 'bootstrap/dist/css/bootstrap.min.css';

const product = products[0];

const saleProducts = products.slice(0, 2);
const newProducts = products.slice(6);

const featured = [
  ...saleProducts,
  ...newProducts
];

const baseStyle = {
  borderRadius: 12
};

const highlight = {
  border: '2px solid gold'
};

function App() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Bài 6 - Spread và Rest</h1>

      <h2 className="mb-3">AppButton</h2>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        <AppButton>
          Mặc định
        </AppButton>

        <AppButton variant="danger" size="sm">
          Danger Small
        </AppButton>

        <AppButton disabled>
          Disabled
        </AppButton>
      </div>

      <h2 className="mb-3">InputField</h2>

      <div className="mb-4">
        <InputField
          id="contactEmail"
          label="Email"
          type="email"
          placeholder="name@example.com"
          required
          helpText="Chúng tôi không chia sẻ email của bạn"
        />
      </div>

      <h2 className="mb-3">Spread Object</h2>

      <div className="mb-4">
        <ProductCard
          product={{
            ...product,
            discount: 30
          }}
        />
      </div>

      <p>
        Discount gốc của Tai nghe:{' '}
        <strong>{products[0].discount}%</strong>
      </p>

      <h2 className="mb-3">Spread Array</h2>

      <p>
        Featured có {featured.length} sản phẩm.
      </p>

      <div className="mb-4">
        <ProductList products={featured} />
      </div>

      <h2 className="mb-3">Spread Style</h2>

      <Card
        style={{
          ...baseStyle,
          ...highlight
        }}
        className="mb-4"
      >
        <Card.Body>
          <Card.Title>Card nổi bật</Card.Title>

          <Card.Text>
            Card này sử dụng spread để gộp hai object style.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;