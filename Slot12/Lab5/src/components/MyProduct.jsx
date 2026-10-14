
import { Badge, Button, Card } from "react-bootstrap";

function MyProduct({ product }) {
  const {
    id,
    name,
    description,
    price,
    discount,
    instock,
    rating,
    category,
  } = product;

  const hasDiscount = discount > 0;
  const isInStock = instock > 0;

  const discountedPrice = price * (1 - discount / 100);

  const formatPrice = (amount) =>
    amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  const handleAddToCart = () => {
    alert(`Bạn đã chọn sản phẩm: ${name}`);
  };

  return (
    <Card className="product-card h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <Badge bg="primary">{category}</Badge>

          {hasDiscount && (
            <Badge bg="danger">-{discount}%</Badge>
          )}
        </div>

        <Card.Title>{name}</Card.Title>

        <Card.Text className="text-muted">
          {description}
        </Card.Text>

        <div className="mb-3">
          <div className="mb-2">
            <strong>Mã sản phẩm:</strong> {id}
          </div>

          <div className="mb-2">
            <strong>Đánh giá:</strong> ⭐ {rating}/5
          </div>

          <div className="mb-2">
            <strong>Tồn kho:</strong>{" "}
            <span className={isInStock ? "text-success" : "text-danger"}>
              {isInStock ? `Còn ${instock} sản phẩm` : "Hết hàng"}
            </span>
          </div>

          {hasDiscount ? (
            <>
              <div className="text-muted">
                <del>{formatPrice(price)}</del>
              </div>

              <h5 className="text-danger fw-bold mt-1">
                {formatPrice(discountedPrice)}
              </h5>
            </>
          ) : (
            <h5 className="fw-bold mt-1">
              {formatPrice(price)}
            </h5>
          )}
        </div>

        <div className="mt-auto">
          {hasDiscount && isInStock && (
            <Button
              variant="primary"
              className="w-100"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyProduct;
