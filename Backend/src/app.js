import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
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
import { broadcastRouter } from "./routes/broadcast.route.js";
import { marketPlace } from "./routes/marketplace.route.js";
import { interestedRouter } from "./routes/interested.route.js";
import { mailerRouter } from "./routes/mailer.route.js";



app.use("/api/v1/user", userRouter)
app.use("/api/v1/broadcast", broadcastRouter)
app.use("/api/v1/marketplace", marketPlace)
app.use("/api/v1/interested", interestedRouter)
app.use("/api/v1/mailer", mailerRouter)


export { app }