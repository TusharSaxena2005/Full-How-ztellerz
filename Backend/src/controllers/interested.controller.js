import mongoose, { isValidObjectId } from "mongoose"
import { Interested } from "../models/interested.model.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleInterested = asyncHandler(async (req, res) => {
    const { broadcastId } = req.params

    if (!isValidObjectId(broadcastId)) {
        throw new apiError(400, "Invalid broadcast Id")
    }

    let toggleResponse = ''

    const interestedOrNot = await Interested.find({ broadCast: broadcastId, interestedBy: req.user._id })

    if (interestedOrNot.length == 0) {
        await Interested.create({
            broadCast: broadcastId,
            interestedBy: req.user._id
        })
        toggleResponse = "Interested"
    }
    else {
        await Interested.deleteOne({
            broadCast: broadcastId,
            interestedBy: req.user._id
        })
        toggleResponse = "Not Interested"
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, toggleResponse, "Interested toggled successfully")
        )
})

// Get all  people that are interested in user broadcast
const getInterestedpeople = asyncHandler(async (req, res) => {
    const { broadcastId } = req.params
    if (!broadcastId) {
        throw new apiError(400, "Invalid broadcast Id")
    }
    const interestedPeople = await Interested.find({ broadCast: broadcastId }).populate('interestedBy', '-password -refreshToken')

    if (!interestedPeople) {
        throw new apiError(404, "No interested people found")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, interestedPeople, "Interested people fetched successfully")
        )
})

// Get all broadcasts that a user is interested in
const getInterestedBroadcastsByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        throw new apiError(400, "Invalid user Id")
    }

    const interestedBroadcasts = await Interested.find({ interestedBy: userId }).populate('broadCast')

    if (!interestedBroadcasts) {
        throw new apiError(404, "No interested broadcasts found")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, interestedBroadcasts, "Interested broadcasts by User fetched successfully")
        )
})

export {
    toggleInterested,
    getInterestedpeople,
    getInterestedBroadcastsByUser
}