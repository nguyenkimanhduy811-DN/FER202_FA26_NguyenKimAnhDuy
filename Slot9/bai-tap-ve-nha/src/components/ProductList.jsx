import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { formatVND } from '../utils/format';
import { getFinalPrice } from '../utils/productUtils';

function ProductList({
  products,
  onAddToCart
}) {
  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => {
          const finalPrice =
            getFinalPrice(product);

          return (
            <Card
              key={product.id}
              className="product-card"
            >
              <Card.Body>
                <Card.Title>
                  {product.name}
                </Card.Title>

                <div className="product-category">
                  {product.category?.name ??
                    'Khác'}
                </div>

                <div className="product-rating">
                  ⭐ {product.rating?.rate ?? 'Chưa có'}
                </div>

                <div className="product-price">
                  {formatVND(finalPrice)}
                </div>

                <div className="product-stock">
                  {product.stock > 0
                    ? `Còn ${product.stock} sản phẩm`
                    : 'Hết hàng'}
                </div>

                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  disabled={
                    !product.stock ||
                    product.stock <= 0
                  }
                  onClick={() =>
                    onAddToCart?.(product)
                  }
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;