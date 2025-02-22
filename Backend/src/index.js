import dotenv from "dotenv"
import connectDb from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: '.env',
})

connectDb()
    .then(() => {
        const port = process.env.PORT || 8000;
        const server = app.listen(port, () => {
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

// Handle shutdown gracefully
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated')
    })
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process interrupted')
    })
})