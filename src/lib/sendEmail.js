const nodemailer = require("nodemailer");

const sendEmail = async (emailAddress, emailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailAddress,
    subject: emailData.subject,
    html: emailData.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
