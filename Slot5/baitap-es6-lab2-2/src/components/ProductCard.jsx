import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ProductCard = ({ product }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock,
    discount = 0
  } = product;

  const imageSrc =
    image ?? 'https://placehold.co/300x200?text=No+Image';

  const categoryName =
    category?.name ?? 'Chưa phân loại';

  const ratingRate =
    rating?.rate ?? 'Chưa có';

  const ratingCount =
    rating?.count ?? 0;

  const finalPrice =
    price * (1 - discount / 100);

  const formattedPrice =
    price?.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }) ?? 'Liên hệ';

  const formattedFinalPrice =
    finalPrice?.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }) ?? 'Liên hệ';

  return (
    <Card
      className={`h-100 position-relative ${
        inStock ? '' : 'opacity-50'
      }`}
      style={{ width: '100%' }}
    >
      {discount > 0 && (
        <Badge
          bg="danger"
          className="position-absolute top-0 end-0 m-2"
        >
          -{discount}%
        </Badge>
      )}

      <Card.Img
        variant="top"
        src={imageSrc}
        alt={name}
      />

      <Card.Body>
        <Card.Title>{name}</Card.Title>

        <Badge bg="primary" className="me-2">
          {categoryName}
        </Badge>

        {inStock ? (
          <Badge bg="success">Còn hàng</Badge>
        ) : (
          <Badge bg="secondary">Hết hàng</Badge>
        )}

        {rating?.rate >= 4.5 && (
          <Badge bg="warning" text="dark" className="ms-2">
            Bán chạy
          </Badge>
        )}

        <Card.Text className="mt-3">
          <strong>Giá:</strong>{' '}
          {discount > 0 ? (
            <>
              <del>{formattedPrice}</del>{' '}
              <strong>{formattedFinalPrice}</strong>
            </>
          ) : (
            <strong>{formattedPrice}</strong>
          )}

          <br />
          <strong>Đánh giá:</strong> {ratingRate} / 5
          <br />
          <strong>Số lượt đánh giá:</strong> {ratingCount}
        </Card.Text>

        <Button
          variant="primary"
          disabled={!inStock}
        >
          {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;