import { Router } from "express";
import { sendOtpMail, contactUsMail } from "../controllers/mailer.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const mailerRouter = Router();

mailerRouter.post("/otpMail", asyncHandler(sendOtpMail));
mailerRouter.post("/contactUsMail", asyncHandler(contactUsMail));

export { mailerRouter };