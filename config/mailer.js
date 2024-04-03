const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_SMTP_HOST,
    port: process.env.MAILER_SMTP_PORT,
    secure: process.env.MAILER_SMTP_SECURE,
    auth: {
        user: process.env.MAILER_SMTP_AUTH_USER,
        pass: process.env.MAILER_SMTP_AUTH_PASS
    }
});

module.exports = transporter;