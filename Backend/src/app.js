import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: '1600kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '1600kb'
}))

app.use(express.static("public"))

app.use(cookieParser())


import { userRouter } from "./routes/user.route.js";
import { broadcastRouter } from "./routes/broadCast.route.js";
import { marketPlace } from "./routes/marketplace.route.js";
import { interestedRouter } from "./routes/interested.route.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/broadcast", broadcastRouter)
app.use("/api/v1/marketplace", marketPlace)
app.use("/api/v1/interested", interestedRouter)


export { app }