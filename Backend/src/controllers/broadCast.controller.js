import mongoose, { isValidObjectId } from "mongoose"
import { Broadcast } from "../models/broadCast.models.js"
import { Interested } from "../models/interested.model.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const publishBroadcast = asyncHandler(async (req, res) => {
    const { title, date, time, destination, category, description } = req.body
    if (
        [title, date, time, destination, category, description].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new apiError(400, "All details are required")
    }

    const broadcast = await Broadcast.create({
        title,
        date,
        time,
        destination,
        description,
        category,
        owner: [req.user]
    })

    if (!broadcast) {
        throw new apiError(500, "Failed to create broadcast")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, broadcast, "Broadcast published successfully")
        )
})

const deleteBroadcast = asyncHandler(async (req, res) => {
    const { broadcastId } = req.params

    if (!isValidObjectId(broadcastId)) {
        throw new apiError(400, "Invalid broadcast id")
    }

    try {
        await Interested.deleteMany({ broadCast: broadcastId })
        await Broadcast.findByIdAndDelete(broadcastId)
    } catch (error) {
        throw new apiError(500, "Broadcast not deleted")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Broadcast successfully deleted")
        )
})

const getAllBroadcasts = asyncHandler(async (req, res) => {
    const allBroadcast = await Broadcast.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $lookup: {
                from: 'interesteds',
                localField: '_id',
                foreignField: 'broadCast',
                as: 'interestedUsers'
            }
        },
        {
            $project: {
                'owner.password': 0,
                'owner.refreshToken': 0
            }
        }
    ]);
    return res
        .status(200)
        .json(
            new apiResponse(200, allBroadcast, "All broadcasts fetched successfully")
        )
})

const getBroadcastsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params
    const allBroadcast = await Broadcast.find({ category: category }).populate("owner", "-password -refreshToken")
    return res
        .status(200)
        .json(
            new apiResponse(200, allBroadcast, `Broadcasts from this ${category} fetched successfully`)
        )
})

const getBroadcastsByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        throw new apiError(400, "User id not exist")
    }

    const allBroadcast = await Broadcast.find({ owner: userId }).populate("owner", "-password -refreshToken")

    if (!allBroadcast) {
        throw new apiError(404, "User not found")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, allBroadcast, `Broadcasts form this id fetched successfully`)
        )
})

export {
    publishBroadcast,
    deleteBroadcast,
    getAllBroadcasts,
    getBroadcastsByCategory,
    getBroadcastsByUserId
}