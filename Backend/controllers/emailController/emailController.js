const nodemailer = require("nodemailer")
const fs = require("fs");
const path = require('path')
const logger = require("../../config/logger");

exports.sendOTPEmail = async(otp,email) => {
    logger.info(`Sending OTP to ${email}`)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_APP_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      // Read the HTML file
      const htmlTemplate = fs.readFileSync(
        path.join(__dirname, "otp.html"),
        "utf8"
      );
  
      // Replace the OTP placeholder with the actual OTP
  
      const htmlContent = htmlTemplate.replace("{{OTP}}", otp);
  
      // Send the email
      const mailOptions = {
        from: process.env.GMAIL_APP_EMAIL,
        to: email,
        subject: "Your Verification Code",
        html: htmlContent,
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "auction_hub_logo.png"),
            cid: "unique@nodemailer.com", // same cid value as in the HTML img src
          },
        ],
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error({"error": error, status:500})
          return({"error": error, status:500});
        } else {
            logger.info({message:`Email sent to ${email}`})
            return({message:"Email sent", status:200, response:info.response})
        }
      });
  
}