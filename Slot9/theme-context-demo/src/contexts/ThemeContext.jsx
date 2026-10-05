import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback
} from 'react';

// Tạo Context với default = null
const ThemeContext = createContext(null);

// Provider quản lý state và logic
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : 'light'
    );
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error(
      'useTheme phải được dùng bên trong <ThemeProvider>'
    );
  }

  return context;
}