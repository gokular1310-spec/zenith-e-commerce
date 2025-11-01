import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../services/mockApiService';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password_bcrypt: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password_bcrypt: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password_bcrypt: string) => {
    setLoading(true);
    try {
      const foundUserOrStatus = await api.login(email, password_bcrypt);

      if (foundUserOrStatus === 'blocked') {
        throw new Error('This account has been blocked.');
      }
      
      if (typeof foundUserOrStatus === 'object' && foundUserOrStatus) {
        const foundUser = foundUserOrStatus;
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        if (foundUser.role === 'admin') {
          navigate('/admin');
        } else if (foundUser.role === 'sub-admin') {
          navigate('/sub-admin');
        } else {
          navigate('/');
        }
      } else {
        throw new Error('User not found or invalid credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password_bcrypt: string) => {
    setLoading(true);
    try {
        const newUser = await api.register(email, password_bcrypt);
        if (newUser) {
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            navigate('/'); // Redirect to home on successful registration
        } else {
            throw new Error('An account with this email already exists.');
        }
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = { user, loading, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};