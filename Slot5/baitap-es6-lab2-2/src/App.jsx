import ProductList from './components/ProductList';
import { products } from './data/products';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Danh sách sản phẩm</h1>

      <ProductList products={products} />
    </div>
  );
}

export default App;