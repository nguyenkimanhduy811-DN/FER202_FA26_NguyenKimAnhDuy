import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { products } from '../data/products';
import { useCartDispatch } from '../contexts/CartContext';

export default function ProductList() {
  const dispatch = useCartDispatch();

  return (
    <div className="product-list">
      <h3 className="mb-3">Sản phẩm</h3>

      <div className="product-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            className="product-card"
          >
            <Card.Body>
              <Card.Title>
                {product.name}
              </Card.Title>

              <Card.Text className="text-muted">
                {product.price.toLocaleString('vi-VN')}đ
              </Card.Text>

              <Button
                variant="primary"
                onClick={() =>
                  dispatch({
                    type: 'ADD',
                    payload: product
                  })
                }
              >
                Add to cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}