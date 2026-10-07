import './App.css';

import LoginForm from './components/LoginForm';

function App() {
  const handleLoginSuccess = (user) => {
    console.log('Login success:', user);
  };

  return (
    <LoginForm
      onLoginSuccess={handleLoginSuccess}
    />
  );
}

export default App;