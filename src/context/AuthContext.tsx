import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('dkv3_session');
    if (session) {
      try {
        setUser(JSON.parse(atob(session)));
      } catch (e) {
        console.error('Invalid session');
      }
    }
  }, []);

  const login = async (username: string, password: string, remember: boolean) => {
    if (username === 'admin' && password === 'admin123') {
      const userData = { username: 'admin', role: 'admin' };
      const sessionData = btoa(JSON.stringify(userData));
      localStorage.setItem('dkv3_session', sessionData);
      setUser(userData);
      return { success: true, message: 'Login berhasil!' };
    }
    return { success: false, message: 'Username atau password salah!' };
  };

  const logout = () => {
    localStorage.removeItem('dkv3_session');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};