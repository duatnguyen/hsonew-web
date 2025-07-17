import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  createTime: string;
  status: number;
  lock: boolean;
  listChar?: string[];
  role: string; // 'user' or 'admin'
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void; // Thêm dòng này
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Helper to parse listChar if it's a stringified array
  const parseListChar = (listChar: any) => {
    if (!listChar) return [];
    if (Array.isArray(listChar)) return listChar;
    try {
      return JSON.parse(listChar);
    } catch {
      return [];
    }
  };

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      if (parsed.listChar) {
        parsed.listChar = parseListChar(parsed.listChar);
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const login = (userData: User) => {
    // Ensure listChar is always an array
    const fixedUser = {
      ...userData,
      listChar: userData.listChar ? parseListChar(userData.listChar) : [],
    };
    setUser(fixedUser);
    localStorage.setItem('user', JSON.stringify(fixedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
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