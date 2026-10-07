import Header from './Header';
import { useTheme } from '../context/ThemeContext';

function Layout({
  children,
  currentPage,
  onNavigate
}) {
  const { theme } = useTheme();

  return (
    <div
      data-bs-theme={theme}
      className="app-theme bg-body text-body min-vh-100"
    >
      <Header
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <main className="app-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;