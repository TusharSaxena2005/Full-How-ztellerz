import { Router } from "express";
import { toggleInterested, getInterestedpeople, getInterestedBroadcastsByUser } from "../controllers/interested.controller.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const interestedRouter = Router();
interestedRouter.use(VerifyJWT);

interestedRouter.route("/toggle/:broadcastId").post(toggleInterested);
interestedRouter.route("/interestedPeople/:broadcastId").get(getInterestedpeople);
interestedRouter.route("/interestedBroadcastsByUser/:userId").get(getInterestedBroadcastsByUser);

export { interestedRouter }