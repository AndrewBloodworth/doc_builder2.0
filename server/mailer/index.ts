import { Mailer } from "../types";
import nodemailer from "nodemailer";
export default ({ to, subject, text }: Mailer): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        secure: true,
        port: 465,
        auth: {
          user: process.env.EMAIL_CLIENT,
          pass: process.env.PASS_CLIENT,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_CLIENT,
        to,
        subject,
        text,
      };
      transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("sent");
          resolve("sent");
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  });
};
