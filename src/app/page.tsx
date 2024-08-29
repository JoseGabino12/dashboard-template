'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/Loader';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

export default function Page () {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true); // Evita múltiples envíos

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.data.token); // Asumiendo que la API retorna un token
      } else {
        if (response.status === 400) {
          toast.error('Credenciales incorrectas, por favor intenta de nuevo.');
        } else {
          toast.error(data.error || 'Ocurrió un error inesperado, por favor intenta nuevamente.');
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error('Hubo un problema al intentar iniciar sesión, por favor intenta nuevamente.');
    } finally {
      setSubmitting(false); // Permite reintentar después de un error
    }
  };

  if (loading) {
    return <Loader />; // Mostrar un loader mientras se verifica la autenticación
  }

  return (
    <main className='h-[100dvh] flex justify-center items-center'>
      <Card className="w-[350px] max-w-sm">
        <CardHeader className='justify-center items-center'>
          <Image src="/assets/logo.jpeg" alt="Logo" width={ 100 } height={ 100 } />
          <CardTitle className="text-2xl">Bienvenido</CardTitle>
          <CardDescription className="text-sm">Ingresa tus credenciales para continuar.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={ handleSubmit } className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                type="text"
                value={ usuario }
                onChange={ (e) => setUsuario(e.target.value) }
                required
                disabled={ submitting } // Deshabilita el campo mientras se envía el formulario
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                required
                disabled={ submitting } // Deshabilita el campo mientras se envía el formulario
              />
            </div>
            <Button className="w-full" type="submit" disabled={ submitting }>
              { submitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar sesión' }
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}