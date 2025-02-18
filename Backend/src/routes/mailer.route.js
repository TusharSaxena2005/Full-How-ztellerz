import { Router } from "express";
import { sendMail } from "../controllers/mailer.controller.js";

const mailerRouter = Router();

mailerRouter.post("/sendmail", sendMail);

export { mailerRouter };