import Badge from 'react-bootstrap/Badge';

import { useCart } from '../contexts/CartContext';

export default function CartBadge() {
  const { items } = useCart();

  const count = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <Badge
      bg="primary"
      className="cart-badge"
    >
      🛒 Giỏ hàng ({count})
    </Badge>
  );
}