"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for development
const demoUsers: Array<User & { password: string }> = [
  {
    id: 'admin-1',
    email: 'admin@alltanks.com.pg',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    company: 'All Tanks Limited',
    phone: '+675 472 2XXX',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date()
  },
  {
    id: 'customer-1',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Smith',
    company: 'ABC Construction',
    phone: '+675 123 4567',
    role: 'customer',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date()
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('all-tanks-user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          // Convert date strings back to Date objects
          user.createdAt = new Date(user.createdAt);
          if (user.lastLogin) user.lastLogin = new Date(user.lastLogin);

          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUser();
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('all-tanks-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('all-tanks-user');
    }
  }, [state.user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user in demo users
    const demoUser = demoUsers.find(u => u.email === email && u.password === password);

    if (demoUser) {
      const { password: _, ...user } = demoUser;
      user.lastLogin = new Date();

      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    }
    setState(prev => ({ ...prev, isLoading: false }));
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = demoUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'An account with this email already exists' };
    }

    // Create new user
    const newUser: User = {
      id: `customer-${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      phone: userData.phone,
      role: 'customer',
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    // Add to demo users (in real app, this would be an API call)
    demoUsers.push({ ...newUser, password: userData.password });

    setState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    });

    return { success: true };
  };

  const logout = () => {
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!state.user) {
      return { success: false, error: 'No user logged in' };
    }

    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = { ...state.user, ...userData };

    setState({
      user: updatedUser,
      isLoading: false,
      isAuthenticated: true,
    });

    return { success: true };
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to check if user has admin role
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

// Helper function to format user display name
export function getUserDisplayName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
