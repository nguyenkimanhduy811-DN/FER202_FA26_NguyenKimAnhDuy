import './App.css';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import HomeContent from './components/HomeContent';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <HomeContent />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;