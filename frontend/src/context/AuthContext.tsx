import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
// Use type-only import for ReactNode
import type { ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  // On mount, check for token and fetch user info if needed
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      // Optionally, fetch user info from backend
      api.get('resumes/')
        .then(() => setUser('user')) // Replace with actual user info if available
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
