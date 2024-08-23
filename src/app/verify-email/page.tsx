// src/app/verify-email/page.tsx
import { db } from "../../lib/db";

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token?: string } }) {
  if (!searchParams.token) {
    return <p>Invalid verification token.</p>;
  }

  // Verificar el token
  const verificationToken = await db.verificationToken.findUnique({
    where: { token: searchParams.token },
  });
  console.log(verificationToken)
  if (!verificationToken || verificationToken.expiresAt < new Date()) {
    return <p>Verification token is invalid or has expired.</p>;
  }

  // Marcar el usuario como verificado
  await db.user.update({
    where: { id: verificationToken.userId },
    data: { emailVerified: true },
  });

  // Eliminar el token de verificación
  await db.verificationToken.delete({
    where: { token: searchParams.token },
  });

  return(
    <>
    <h1>Email verified successfully. You can now log in.</h1>
    <p>You can close this page</p>
    </>
  )
}
