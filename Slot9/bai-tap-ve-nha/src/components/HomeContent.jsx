import Card from 'react-bootstrap/Card';

import LoginForm from './LoginForm';
import { useAuth } from '../context/AuthContext';

function HomeContent() {
  const {
    isLoggedIn,
    user,
    login
  } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="home-login">
        <LoginForm
          onLoginSuccess={login}
        />
      </div>
    );
  }

  return (
    <Card className="home-card shadow-sm">
      <Card.Body className="p-4">
        <h2>Trang chủ</h2>

        <p className="mb-1">
          Bạn đã đăng nhập thành công.
        </p>

        <p className="mb-0">
          Tài khoản:{' '}
          <strong>{user.email}</strong>
        </p>
      </Card.Body>
    </Card>
  );
}

export default HomeContent;