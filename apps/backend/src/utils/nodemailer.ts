// import nodemailer from 'nodemailer';

// export const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail address
//     pass: process.env.EMAIL_PASS, // App Password (Not normal Gmail password!)
//   },
// });

// export async function sendOtpEmail(to: string, otp: string) {
//   console.log(`Sending OTP ${otp} to email: ${to}`);
//   await transporter.sendMail({
//     from: `"Electrical Solution" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
//   });
// }

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpEmail = async (
  to: string,
  otp: string,
  subject = 'Your OTP Code'
) => {
  const info = await transporter.sendMail({
    from: '"Electrical Solution" <no-reply@electricalsolution.com>',
    to,
    subject,
    text: `Your OTP is: ${otp}`,
  });

  console.log(`OTP Email sent: ${info.messageId}`);
};
