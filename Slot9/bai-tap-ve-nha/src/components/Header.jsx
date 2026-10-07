import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

  const {
    user,
    isLoggedIn,
    logout
  } = useAuth();

  return (
    <Navbar
      expand="lg"
      bg={theme === 'dark' ? 'dark' : 'light'}
      data-bs-theme={theme}
      className="border-bottom"
    >
      <Container>
        <Navbar.Brand href="#">
          My App
        </Navbar.Brand>

        <div className="header-actions">
          <Button
            variant="outline-secondary"
            onClick={toggleTheme}
          >
            {theme === 'light'
              ? '🌙 Tối'
              : '☀️ Sáng'}
          </Button>

          {isLoggedIn ? (
            <>
              <span className="user-greeting">
                Xin chào, {user.name}
              </span>

              <Button
                variant="outline-danger"
                onClick={logout}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <span className="text-body-secondary">
              Chưa đăng nhập
            </span>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;