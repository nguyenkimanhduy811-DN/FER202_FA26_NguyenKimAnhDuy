import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');

    return saved
      ? JSON.parse(saved)
      : null;
  });

  const login = useCallback(
    (username, password) => {
      // Demo đăng nhập
      if (
        username === 'admin' &&
        password === '123'
      ) {
        const u = {
          username,
          role: 'admin'
        };

        setUser(u);

        localStorage.setItem(
          'user',
          JSON.stringify(u)
        );

        return true;
      }

      return false;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth phải nằm trong <AuthProvider>'
    );
  }

  return context;
}