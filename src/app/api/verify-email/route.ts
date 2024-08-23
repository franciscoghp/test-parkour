import { db } from "../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') || '';
  
  // Busca el token en la base de datos
  const verificationToken = await db.verificationToken.findUnique({ where: { token } });
  //console.log(verificationToken)
  if (!verificationToken) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  // Verifica el usuario
  await db.user.update({
    where: { id: verificationToken.userId },
    data: { emailVerified: true },
  });

  // Elimina el token después de usarlo
  await db.verificationToken.delete({ where: { token } });

  return NextResponse.json({ message: 'Email verified successfully. You can now log in.' }, { status: 200 });
}
