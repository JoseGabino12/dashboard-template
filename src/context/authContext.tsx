'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de importar correctamente
import { JwtPayload } from '@/interfaces/interfaces';

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      try {
        const { exp } = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;

        if (exp > now) {
          setIsAuthenticated(true);
        } else {
          Cookies.remove('token');
          setIsAuthenticated(false);
          router.replace('/'); // Redirige al login si el token ha expirado
        }
      } catch (error) {
        Cookies.remove('token');
        setIsAuthenticated(false);
        router.replace('/'); // Redirige al login si el token es inválido
      }
    } else {
      setIsAuthenticated(false);
      router.replace('/'); // Redirige al login si no hay token
    }

    setLoading(false);
  }, [router]);

  const login = (token: string) => {
    Cookies.set('token', token);
    setIsAuthenticated(true);
    router.replace('/home'); // Redirige al usuario a la página de inicio tras el login
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    router.replace('/'); // Redirige al login tras hacer logout
  };

  return (
    <AuthContext.Provider value={ { isAuthenticated, loading, login, logout } }>
      { children }
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