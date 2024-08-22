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

  try {
    const response = await fetch(`x?del=${from}&al=${to}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
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