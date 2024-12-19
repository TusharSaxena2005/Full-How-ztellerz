import mongoose, { Schema } from "mongoose"

const broadcastSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        destination: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: String,
            trim: true,
        },
        time: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            required: true,
        },
        owner: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    { timestamps: true }
)

export const Broadcast = mongoose.model("Broadcast", broadcastSchema)