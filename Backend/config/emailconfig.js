const nodemailer = require("nodemailer")

exports.transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_APP_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });