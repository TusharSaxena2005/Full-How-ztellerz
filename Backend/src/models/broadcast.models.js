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
        description: {
            type: String,
            trim: true,
        },
        date: {
            type: String,
            required: true,
            trim: true,
        },
        time: {
            type: String,
            required: true,
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
