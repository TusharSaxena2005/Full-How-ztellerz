import { Resend } from 'resend';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpMail = async (req, res) => {
    const { mailId } = req.body;

    console.log('📧 OTP request received for:', mailId);
    console.log('✓ RESEND_API_KEY set?', !!process.env.RESEND_API_KEY);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        console.log('📤 Sending OTP via Resend to:', mailId);
        const data = await resend.emails.send({
            from: 'How\'ztellerz <noreply@resend.dev>',
            to: mailId,
            subject: "Welcome to How'zellerz",
            html: `<p>Your verification code to create account is <strong>${otp}</strong></p>`
        });
        
        console.log('✅ OTP Mail sent:', data.id);
        
        if (data.error) {
            throw new Error(data.error.message);
        }
    } catch (err) {
        console.error('❌ Send failed:', err.message);
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
    console.log('✓ RESEND_API_KEY set?', !!process.env.RESEND_API_KEY);

    try {
        console.log('📤 Sending contact mail via Resend to admin');
        const data = await resend.emails.send({
            from: 'How\'ztellerz Contact Form <noreply@resend.dev>',
            to: "dutushar2005@gmail.com",
            subject: "Contact Us mail from How'zellerz",
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });
        
        console.log('✅ Contact mail sent:', data.id);
        
        if (data.error) {
            throw new Error(data.error.message);
        }
    } catch (err) {
        console.error('❌ Send failed:', err.message);
        throw new apiError(500, `Error sending mail: ${err.message}`)
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, "Mail sent successfully")
        )
}

export { sendOtpMail, contactUsMail }