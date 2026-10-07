import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const menuItems = [
  {
    key: 'shop',
    label: 'Cửa hàng'
  },
  {
    key: 'cart',
    label: 'Giỏ hàng'
  },
  {
    key: 'checkout',
    label: 'Thanh toán'
  }
];

function Header({
  currentPage,
  onNavigate
}) {
  const { theme, toggleTheme } = useTheme();

  const {
    user,
    isLoggedIn,
    logout
  } = useAuth();

  const { totalQuantity } = useCart();

  return (
    <Navbar
      expand="lg"
      className="border-bottom"
      data-bs-theme={theme}
    >
      <Container>
        <Navbar.Brand
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('shop');
          }}
        >
          <strong>FPT Shop Mini</strong>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            {menuItems.map((item) => (
              <Nav.Link
                key={item.key}
                href="#"
                active={
                  currentPage === item.key
                }
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.key);
                }}
              >
                {item.label}

                {item.key === 'cart' &&
                  totalQuantity > 0 && (
                    <Badge
                      bg="primary"
                      className="ms-2"
                    >
                      {totalQuantity}
                    </Badge>
                  )}
              </Nav.Link>
            ))}
          </Nav>

          <div className="header-right">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === 'light'
                ? '🌙'
                : '☀️'}
            </Button>

            {isLoggedIn ? (
              <>
                <span className="user-name">
                  Xin chào, {user.name}
                </span>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={logout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  onNavigate('login')
                }
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;