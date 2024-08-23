// // src/lib/email.ts
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendVerificationEmail(email: string, token: string) {
//   console.log({email, token})
//   const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;
//   console.log(verificationUrl)
//   const emailFrom = process.env.EMAIL_FROM as string;
//   // console.log(emailFrom)
//   const response = await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: [email],
//     subject: "Verify your email address",
//     html: `<p>Click the link below to verify your email address:</p>
//            <a href="${verificationUrl}">Verify Email</a>`,
//   });
//   console.log(response)
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
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'francisco9mil@gmail.com', // Tu dirección de correo electrónico
    pass: 'boqbmanalifslcgr',// Tu contraseña de la cuenta de correo
  },
  tls: {
    rejectUnauthorized: false,
  },
});
// boqb mana lifs lcgr
// Función para enviar el correo
export async function sendVerificationEmail(email: string, token: string) {
  try {
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;
    const mailOptions = {
      from: 'francisco9mil@gmail.com', // El correo desde el que se envía
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
