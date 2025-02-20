import { Router } from "express";
import { sendOtpMail, contactUsMail } from "../controllers/mailer.controller.js";

const mailerRouter = Router();

mailerRouter.post("/otpMail", sendOtpMail);
mailerRouter.post("/contactUsMail", contactUsMail);

export { mailerRouter };