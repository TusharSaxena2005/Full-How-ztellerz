import nodemailer from 'nodemailer';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';

export const sendMail = async (req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "tushar.dec6@gmail.com",
            pass: "gbvmxwzozasswtjx"
        }
    })

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const mailer = {
        from: "tushar.dec6@gmail.com",
        to: email,
        subject: "Welcome to How'zellerz",
        text: `Your verification code to create account is ${otp}`
    }

    transporter.sendMail(mailer, (err) => {
        if (err) {
            new apiError(500, "Error sending mail")
        }
    })

    return res
        .status(200)
        .json(
            new apiResponse(200, otp, "Mail sent successfully")
        )
}