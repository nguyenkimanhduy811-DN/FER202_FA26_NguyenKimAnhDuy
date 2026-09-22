import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  const categories = [
    'Tất cả',
    ...new Set(products.map((p) => p.category.name))
  ];

  return (
    <div>
      <h2 className="mb-3">
        {`Có ${products.length} sản phẩm`}
      </h2>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline-primary"
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;