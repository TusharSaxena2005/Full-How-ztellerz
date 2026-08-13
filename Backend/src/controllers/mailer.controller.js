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

    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: mailId,
            subject: "Welcome to How'zellerz",
            text: `Your verification code: ${otp}`
        })
        console.log('✅ OTP sent');
    } catch (err) {
        console.error('❌ Error:', err.message);
        throw new apiError(500, `Error sending mail: ${err.message}`)
    }

    return res.status(200).json(new apiResponse(200, otp, "Otp sent successfully"))
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

    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: "dutushar2005@gmail.com",
            subject: "Contact Us mail from How'zellerz",
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        })
        console.log('✅ Contact mail sent');
    } catch (err) {
        console.error('❌ Error:', err.message);
        throw new apiError(500, `Error sending mail: ${err.message}`)
    }

    return res.status(200).json(new apiResponse(200, "Mail sent successfully"))
}

export { sendOtpMail, contactUsMail }