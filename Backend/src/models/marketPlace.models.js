import mongoose, { Schema } from "mongoose"

const marketplaceSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        itemPrice: {
            type: Number,
            required: true
        },
        itemImage: {
            type: String,
            required: true
        },
        itemCategory: {
            type: String,
            required: true
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

export const Marketplace = mongoose.model("Marketplace", marketplaceSchema)