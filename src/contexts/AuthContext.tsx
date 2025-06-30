import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  coin: number;
  email: string;
  phone: string;
  createdAt: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, coin: number) => void;
  logout: () => void;
  updatePassword: (newPassword: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, coin: number) => {
    // Simulate user data - in real app this would come from API
    setUser({
      username,
      coin,
      email: 'user@example.com',
      phone: '0123456789',
      createdAt: new Date().toISOString(),
      password: 'defaultpassword'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updatePassword = (newPassword: string) => {
    if (user) {
      setUser({ ...user, password: newPassword });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updatePassword }}>
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