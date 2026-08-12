import nodemailer from 'nodemailer';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';

const sendOtpMail = async (req, res) => {
    const { mailId } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const mailer = {
        from: process.env.MAIL_USER || 'no-reply@howztellerz.shop',
        to: mailId,
        subject: "Welcome to How'zellerz",
        text: `Your verification code to create account is\n ${otp}`
    }

    // verify transporter before sending for clearer errors
    try {
        await transporter.verify()
    } catch (err) {
        console.error('Mailer verify failed:', err)
        throw new apiError(500, `Mailer verify failed: ${err.message}`)
    }

    try {
        const info = await transporter.sendMail(mailer)
        console.log('Mail sent:', info && info.messageId)
    } catch (err) {
        console.error('Error sending mail:', err)
        throw new apiError(500, `Error sending mail: ${err.message}`)
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, otp, "Otp sent successfully")
        )
}

const contactUsMail = async (req, res) => {
    const { firstName, lastName, message, email, phone } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const mailer = {
        from: process.env.MAIL_USER || 'no-reply@howztellerz.shop',
        to: "dutushar2005@gmail.com",
        subject: "Contact Us mail from How'zellerz",
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    }

    try {
        await transporter.verify()
    } catch (err) {
        console.error('Mailer verify failed:', err)
        throw new apiError(500, `Mailer verify failed: ${err.message}`)
    }

    try {
        const info = await transporter.sendMail(mailer)
        console.log('Contact mail sent:', info && info.messageId)
    } catch (err) {
        console.error('Error sending contact mail:', err)
        throw new apiError(500, `Error sending mail: ${err.message}`)
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, "Mail sent successfully")
        )
}

export { sendOtpMail, contactUsMail }