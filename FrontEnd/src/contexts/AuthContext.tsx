import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  coin: number;
  email: string;
  phone: string;
  createTime: string;
  status: number;
  lock: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email?: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API helper function
  const apiCall = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    const data = await response.json();
    if (!response.ok && !data) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return data;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        return true;
      } else {
        setError(result.message || 'Đăng nhập thất bại');
        return false;
      }
    } catch (err) {
      setError('Lỗi kết nối. Vui lòng thử lại.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string, email?: string, phone?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall('/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, email, phone }),
      });
      
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        return true;
      } else {
        setError(result.message || 'Đăng ký thất bại');
        return false;
      }
    } catch (err) {
      setError('Lỗi kết nối. Vui lòng thử lại.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall('/change-password', {
        method: 'POST',
        body: JSON.stringify({
          accountId: user.id,
          oldPassword,
          newPassword,
        }),
      });
      
      if (result.success) {
        return true;
      } else {
        setError(result.message || 'Đổi mật khẩu thất bại');
        return false;
      }
    } catch (err) {
      setError('Lỗi kết nối. Vui lòng thử lại.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  };

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updatePassword, 
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 