"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = ({ to, subject, text }) => {
    return new Promise((resolve, reject) => {
        try {
            const transporter = nodemailer_1.default.createTransport({
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
                }
                else {
                    console.log("sent");
                    resolve("sent");
                }
            });
        }
        catch (ex) {
            console.log(ex);
        }
    });
};
