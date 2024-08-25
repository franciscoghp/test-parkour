// // src/lib/email.ts
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendVerificationEmail(email: string, token: string) {

//   const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

//   const emailFrom = process.env.EMAIL_FROM as string;

//   const response = await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: [email],
//     subject: "Verify your email address",
//     html: `<p>Click the link below to verify your email address:</p>
//            <a href="${verificationUrl}">Verify Email</a>`,
//   });

// }


// await resend.emails.send({
//   from: 'Acme <onboarding@resend.dev>',
//   to: ['delivered@resend.dev'],
//   subject: 'hello world',
//   html: '<p>it works!</p>',
// });

import nodemailer from 'nodemailer';

// Configura tu transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER, // Tu dirección de correo electrónico
    pass: process.env.EMAIL_SERVER_PASSWORD,// Tu contraseña de la cuenta de correo
  },
  tls: {
    rejectUnauthorized: false,
  },
});
// boqb mana lifs lcgr
// Función para enviar el correo
export async function sendVerificationEmail(email: string, token: string) {
  try {
    let url = process.env.NODE_ENV == 'production' ? process.env.VERCEL_URL : 'http://localhost:3000'
    const verificationUrl = `${url}/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER, // El correo desde el que se envía
      to: email, // El correo del destinatario
      subject: "Verify your email address",
      html: `<p>Click the link below to verify your email address:</p>
            <a href="${verificationUrl}">Verify Email</a>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo: %s', error);
  }
}
