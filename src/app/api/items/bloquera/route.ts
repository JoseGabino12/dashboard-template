import type { JwtPayload } from '@/interfaces/interfaces';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('del');
  const to = searchParams.get('al');

  if (!from || !to) {
    return NextResponse.json({ 
      message: 'Parámetros inválidos', 
      error: 'Los parámetros de búsqueda son requeridos' 
    }, { status: 400 });
  }

  const cookieHeader = req.headers.get('cookie');
  const token = cookieHeader
    ?.split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({ 
      message: 'No autenticado', 
      error: 'Token no encontrado' 
    }, { status: 401 });
  }

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;

    if (exp < now) {
      return NextResponse.json({ 
        message: 'El token ha expirado', 
        error: 'Por favor, autentíquese nuevamente' 
      }, { status: 401 });
    }

    const response = await fetch(`x?del=${from}&al=${to}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = 'Un error inesperado ocurrió';

      switch (response.status) {
        case 401:
          errorMessage = 'El token expiró';
          break;
        case 403:
          errorMessage = 'No tienes permisos para realizar esta acción';
          break;
        case 404:
          errorMessage = 'No se encontraron resultados';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${response.status}: ${response.statusText}`;
          break;
      }

      return NextResponse.json({ 
        message: 'Algo salió mal', 
        error: errorMessage 
      }, { status: response.status });
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length === 0) {
      return NextResponse.json({
        message: 'No se encontró información para el rango de fechas especificado.',
        data: []
      }, { status: 200 });
    }
    
    return NextResponse.json(data);

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Un error inesperado ocurrió';

    return NextResponse.json({ 
      message: 'Algo salió mal', 
      error: errorMessage 
    }, { status: 500 });
  }
}