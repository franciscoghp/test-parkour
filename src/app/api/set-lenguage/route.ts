import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { locale } = await request.json();

  const response = NextResponse.json({ message: 'Locale set successfully' });

  // Establece la cookie del idioma
  response.cookies.set('locale', locale, { path: '/' });

  return response;
}
