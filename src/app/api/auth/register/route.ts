import { hash } from 'bcrypt';
import { db } from '@/lib/db/index';
import { sendVerificationEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { addHours } from "date-fns";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  //console.log({ name, email, password } )
  // Check if the user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);
  //console.log({ hashedPassword } )
  // Create the user in the database
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerified: false, // Set email verification status to false
    },
  });
  //console.log({user})
  // Generate a token for email verification (e.g., JWT or UUID)
  const token = randomBytes(32).toString('hex');
  const expiresAt = addHours(new Date(), 1); // Token expira en 1 hora
  //console.log({token})

  // Guardar el token en la base de datos
  await db.verificationToken.create({
    data: {
      token,
      expiresAt,
      userId: user.id,
    },
  });

  // Send the verification email
  await sendVerificationEmail(email, token);

  return NextResponse.json({ message: 'User registered successfully. Please verify your email.' }, { status: 201 });
}
