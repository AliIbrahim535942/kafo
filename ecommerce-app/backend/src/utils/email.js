const nodemailer = require("nodemailer");

const createTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return nodemailer.createTransport({
    jsonTransport: true,
  });
};

const sendResetEmail = async ({ to, resetLink }) => {
  const transporter = await createTransporter();

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || "no-reply@ecommerce.com",
    to,
    subject: "Reset your password",
    text: `Use this link to reset your password: ${resetLink}`,
  });

  return info;
};

module.exports = {
  sendResetEmail,
};
