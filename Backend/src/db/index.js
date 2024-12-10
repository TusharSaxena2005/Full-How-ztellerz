import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDb = async () => {
    try {
        const connectionDb = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\nDatabase successfully connected`)
    } catch (error) {
        console.error("Database not connected:", error)
        process.exit(1)
    }
}

export default connectDb