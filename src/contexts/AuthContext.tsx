import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, AuthState } from '../auth/localAuth';
import { initializeAuth, signIn, signUp, signOut, getCurrentUser } from '../auth/localAuth';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organization?: string;
    accountType: 'personal' | 'organization';
  }) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => initializeAuth());

  useEffect(() => {
    const user = getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: !!user,
    });
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.user) {
      setAuthState({
        user: result.user,
        isAuthenticated: true,
      });
    }
    return result;
  };

  const handleSignUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organization?: string;
    accountType: 'personal' | 'organization';
  }) => {
    const result = await signUp(userData);
    return result;
  };

  const handleSignOut = () => {
    signOut();
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  const updateUser = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
    });
  };

  const value: AuthContextType = {
    ...authState,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
