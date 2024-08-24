import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const locale = String(cookies.get('locale')) || 'es'; // Valor por defecto
  const response = NextResponse.next();
  response.headers.set('x-locale', locale); // Puedes usar esta cabecera para verificar el idioma

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
