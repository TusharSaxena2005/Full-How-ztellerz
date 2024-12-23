import mongoose, { isValidObjectId } from "mongoose"
import { Marketplace } from "../models/marketPlace.models.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { cloudnaryUpload, cloudnaryDelete } from "../utils/cloudnary.js"

const addItem = asyncHandler(async (req, res) => {
    const { itemName, itemPrice, itemCategory } = req.body
    if (
        [itemName, itemPrice, itemCategory].some((fields) => { fields?.trim == "" })
    ) {
        throw new apiError(400, "Please fill all fields")
    }
    const itemImage = req.file.path;
    if (!itemImage) {
        throw new apiError(400, "Please upload item image")
    }
    const itemImagePath = await cloudnaryUpload(itemImage)

    const item = await Marketplace.create({
        itemName,
        itemPrice,
        itemCategory,
        itemImage: itemImagePath.url,
        owner: [req.user]
    })

    if (!item) {
        throw new apiError(404, "Item not added")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, item, "Item successfully added")
        )
})

const deleteItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params
    if (!isValidObjectId(itemId)) {
        throw new apiError(400, "Invalid item Id")
    }
    const item = await Marketplace.findByIdAndDelete(itemId)

    let urlSeperator = []
    let url = item.itemImage
    let urlWord = ''
    for (let i = 0; i < url.length; i++) {
        if (url[i] == '/') {
            urlSeperator.push(urlWord)
            urlWord = ''
        }
        else if (url[i] == '.') {
            urlSeperator.push(urlWord)
        }
        else {
            urlWord += url[i]
        }
    }

    try {
        await cloudnaryDelete(urlSeperator[urlSeperator.length - 1])
    } catch (error) {
        throw new apiError(500, "Unable to delete from cloud")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Item successfully deleted")
        )
})

const getAllItem = asyncHandler(async (req, res) => {
    const allItem = await Marketplace.find().populate("owner", "-password -refreshToken")

    return res
        .status(200)
        .json(
            new apiResponse(200, allItem, "All items successfully fetched")
        )
})

const getItemByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params
    const allItem = await Marketplace.find({ itemCategory: category }).populate("owner", "-password -refreshToken")

    return res
        .status(200)
        .json(
            new apiResponse(200, allItem, `${category} items successfully fetched`)
        )
})

const getItemByHostelName = asyncHandler(async (req, res) => {
    const { hostelName, floorNo } = req.body

    if (!hostelName && !floorNo) {
        throw new apiError(400, "Please provide hostel name and floor number")
    }

    let matchCondition = {};
    if (hostelName && floorNo) {
        matchCondition = { 'owner.hostelName': hostelName, 'owner.floorNo': floorNo };
    } else if (hostelName) {
        matchCondition = { 'owner.hostelName': hostelName };
    } else if (floorNo) {
        matchCondition = { 'owner.floorNo': floorNo };
    }

    let allItem = await Marketplace.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $unwind: '$owner'
        },
        {
            $match: matchCondition
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
            new apiResponse(200, allItem, `${hostelName} items successfully fetched`)
        )
})

const getItemByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params
    
    if (!isValidObjectId(userId)) {
        throw new apiError(400, "Invalid user Id")
    }

    const allItem = await Marketplace.find({ owner: userId }).populate("owner", "-password -refreshToken")

    return res
        .status(200)
        .json(
            new apiResponse(200, allItem, `${allItem[0].owner[0].name} items successfully fetched`)
        )
})

export {
    addItem,
    deleteItem,
    getAllItem,
    getItemByCategory,
    getItemByHostelName,
    getItemByUserId
}