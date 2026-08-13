import nodemailer from 'nodemailer';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';

const sendOtpMail = async (req, res) => {
    const { mailId } = req.body;

    console.log('📧 OTP request received for:', mailId);
    console.log('✓ MAIL_USER set?', !!process.env.MAIL_USER);
    console.log('✓ MAIL_PASS set?', !!process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        connectionTimeout: 15000,
        socketTimeout: 15000,
        tls: {
            rejectUnauthorized: false
        }
    })

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const mailer = {
        from: process.env.MAIL_USER,
        to: mailId,
        subject: "Welcome to How'zellerz",
        text: `Your verification code to create account is\n ${otp}`
    }

    // verify transporter before sending for clearer errors
    try {
        console.log('🔍 Verifying transporter...');
        await transporter.verify()
        console.log('✅ Transporter verified!');
    } catch (err) {
        console.error('❌ Verify failed:', err.message, 'Code:', err.code);
        throw new apiError(500, `Mailer verify failed: ${err.message}`)
    }

    try {
        console.log('📤 Sending mail to:', mailId);
        const info = await transporter.sendMail(mailer)
        console.log('✅ Mail sent:', info && info.messageId)
    } catch (err) {
        console.error('❌ Send failed:', err.message, 'Code:', err.code);
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

    console.log('📧 Contact us request from:', email);
    console.log('✓ MAIL_USER set?', !!process.env.MAIL_USER);
    console.log('✓ MAIL_PASS set?', !!process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        connectionTimeout: 15000,
        socketTimeout: 15000,
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailer = {
        from: process.env.MAIL_USER || 'no-reply@howztellerz.shop',
        to: "dutushar2005@gmail.com",
        subject: "Contact Us mail from How'zellerz",
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    }

    try {
        console.log('🔍 Verifying transporter...');
        await transporter.verify()
        console.log('✅ Transporter verified!');
    } catch (err) {
        console.error('❌ Verify failed:', err.message, 'Code:', err.code);
        throw new apiError(500, `Mailer verify failed: ${err.message}`)
    }

    try {
        console.log('📤 Sending contact mail to admin');
        const info = await transporter.sendMail(mailer)
        console.log('✅ Contact mail sent:', info && info.messageId)
    } catch (err) {
        console.error('❌ Send failed:', err.message, 'Code:', err.code);
        throw new apiError(500, `Error sending mail: ${err.message}`)
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, "Mail sent successfully")
        )
}

export { sendOtpMail, contactUsMail }