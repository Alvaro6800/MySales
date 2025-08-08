import nodemailer from "nodemailer";
import "dotenv/config";

interface ISendEmail {
  to: string;
  subject: string;
  body: string;
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = ({ to, subject, body }: ISendEmail) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    html: body,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
