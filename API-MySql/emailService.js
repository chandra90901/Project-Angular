// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,  // Use App Password for Gmail with 2FA enabled
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    text: text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject('Error occurred: ' + error);
      } else {
        resolve('Email sent successfully: ' + info.response);
      }
    });
  });
};

module.exports = { sendEmail };
