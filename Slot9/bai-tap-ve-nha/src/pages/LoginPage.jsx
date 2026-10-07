import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

function LoginPage({
  onNavigate
}) {
  const { login } = useAuth();

  const handleLoginSuccess = (result) => {
    login(result.email);
    onNavigate('shop');
  };

  return (
    <LoginForm
      onLoginSuccess={handleLoginSuccess}
    />
  );
}

export default LoginPage;