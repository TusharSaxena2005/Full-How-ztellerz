import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

const rawCors = process.env.CORS_ORIGIN || ''
const allowedOrigins = rawCors
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

app.use(cors({
    origin: function(origin, callback) {
        // allow non-browser requests like curl (no origin)
        if (!origin) return callback(null, true)
        if (allowedOrigins.length === 0) return callback(null, true)
        if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true)
        return callback(new Error('Not allowed by CORS'))
    },
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
import { healthRouter } from "./routes/health.route.js";  

app.use("/api/v1/user", userRouter)
app.use("/api/v1/broadcast", broadcastRouter)
app.use("/api/v1/marketplace", marketPlace)
app.use("/api/v1/interested", interestedRouter)
app.use("/api/v1/mailer", mailerRouter)
app.use("/api/v1/health", healthRouter)


export { app }