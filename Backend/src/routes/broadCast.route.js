import { Router } from "express"
import { publishBroadcast, deleteBroadcast, getAllBroadcasts, getBroadcastsByCategory,getBroadcastsByUserId } from "../controllers/broadcast.controller.js"
import { VerifyJWT } from "../middleware/auth.middleware.js";

const broadcastRouter = Router();
broadcastRouter.use(VerifyJWT)

broadcastRouter.post("/publish-broadcast", publishBroadcast);
broadcastRouter.get("/delete-broadcast/:broadcastId", deleteBroadcast);
broadcastRouter.get("/all-broadcasts", getAllBroadcasts);
broadcastRouter.get("/filtered-broadcasts/:category", getBroadcastsByCategory);
broadcastRouter.get("/broadcast-profile/:userId", getBroadcastsByUserId);

export { broadcastRouter }