import { Router } from "express"
import { publishBroadcast, deleteBroadcast, getAllBroadcasts, getBroadcastsByCategory, getBroadcastsByUserId } from "../controllers/broadcast.controller.js"
import { VerifyJWT } from "../middleware/auth.middleware.js";

const broadcastRouter = Router();
broadcastRouter.use(VerifyJWT)

broadcastRouter.route("/publish-broadcast").post(publishBroadcast)
broadcastRouter.route("/delete-broadcast/:broadcastId").get(deleteBroadcast)
broadcastRouter.route("/all-broadcasts").get(getAllBroadcasts)
broadcastRouter.route("/filtered-broadcasts/:category").get(getBroadcastsByCategory)
broadcastRouter.route("/broadcast-profile/:userId").get(getBroadcastsByUserId)

export { broadcastRouter }