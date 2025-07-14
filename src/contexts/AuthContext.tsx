import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  coin: number;
  createTime: string;
  status: number;
  lock: boolean;
  listChar?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updatePassword: (newPassword: string) => Promise<void>;
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

  const updatePassword = async (newPassword: string) => {
    if (!user) return;

    try {
      await axios.post('http://localhost:8080/api/auth/change-password', {
        username: user.username,
        newPassword: newPassword
      });
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
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