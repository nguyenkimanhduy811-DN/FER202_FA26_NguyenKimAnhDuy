import ProductFilter from './components/ProductFilter';
import { products } from './data/products';
import './App.css';

function App() {
  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
  };

  return (
    <ProductFilter
      products={products}
      onAddToCart={handleAddToCart}
    />
  );
}

export default App;