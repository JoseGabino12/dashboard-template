'use client';

import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Home from '@/components/Home';

export default function HomePage () {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/'); // Redirige al login si no está autenticado o el token ha expirado
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <p>Cargando...</p>; // O un spinner, mientras se verifica la autenticación
  }

  return <Home />;
}