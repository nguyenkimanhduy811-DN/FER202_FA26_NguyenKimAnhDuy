import ProductCard from './components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const productA = {
  id: 1,
  name: 'Tai nghe Bluetooth',
  price: 590000,
  image: 'https://picsum.photos/seed/headphone/300/200',
  rating: {
    rate: 4.5,
    count: 120
  },
  category: {
    name: 'Âm thanh'
  }
};

const productB = {
  id: 2,
  name: 'Chuột không dây',
  price: 0
};

const productC = {
  id: 3
};

function App() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Product Cards</h1>

      <div className="row">
        <div className="col-md-4 mb-3">
          <ProductCard product={productA} />
        </div>

        <div className="col-md-4 mb-3">
          <ProductCard product={productB} />
        </div>

        <div className="col-md-4 mb-3">
          <ProductCard product={productC} />
        </div>
      </div>
    </div>
  );
}

export default App;