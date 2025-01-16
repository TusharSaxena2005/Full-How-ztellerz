import mongoose, { Schema } from "mongoose"

const interestedSchema = new Schema(
    {
        broadCast: {
            type: Schema.Types.ObjectId,
            ref: 'Broadcast'
        },
        interestedBy:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

export const Interested = mongoose.model("Interested", interestedSchema)