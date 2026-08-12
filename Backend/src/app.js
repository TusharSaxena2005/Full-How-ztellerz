import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

const allowedOrigins = [
    'https://howztellerz.shop',
    'https://www.howztellerz.shop',
    'https://api.howztellerz.shop',
    'https://howzellerz.store',
    'https://www.howzellerz.store'
]

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) return callback(null, true)
        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

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