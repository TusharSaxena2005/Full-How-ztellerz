import dotenv from "dotenv"
import connectDb from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: '.env',
})

let server; // Declare server variable outside

connectDb()
    .then(() => {
        const port = process.env.PORT || 8000;
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use. Please use a different port.`);
                process.exit(1);
            } else {
                console.error('Server error:', err);
            }
        });
    })
    .catch((err) => {
        console.log("Error connecting to database", err)
    })

process.on('SIGTERM', () => {
    if (server) {
        server.close(() => {
            console.log('Process terminated')
        })
    }
})

process.on('SIGINT', () => {
    if (server) {
        server.close(() => {
            console.log('Process interrupted')
        })
    }
})