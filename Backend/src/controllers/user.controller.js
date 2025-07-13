import mongoose, { isValidObjectId } from "mongoose"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
import { cloudnaryUpload, cloudnaryDelete } from "../utils/cloudnary.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { deleteFile } from "../middleware/multer.middleware.js"



const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new apiError(505, "Something went wrong while creating new token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, phoneNo, mailId, rollNo, hostelName, floorNo, roomNo, password, gender } = req.body
    if (
        [name, phoneNo, mailId, rollNo, hostelName, floorNo, roomNo, password, gender].some((fileds) => {
            fileds?.trim === ""
        })
    ) {
        throw new apiError(400, "Please fill all the fields")
    }

    const existingUser = await User.findOne({
        $or: [{ mailId }, { phoneNo }, { rollNo }]
    })

    let profilePicPath;
    if (req.files && Array.isArray(req.files.profilePic)) {
        profilePicPath = await req.files.profilePic[0].path
    }

    if (existingUser) {
        if (profilePicPath != "") {
            deleteFile(profilePicPath);
        }
        throw new apiError(409, "User already exists")
    }

    let profilePic;
    if (profilePicPath != "") {
        profilePic = await cloudnaryUpload(profilePicPath);
    }


    const user = await User.create({
        name,
        phoneNo,
        mailId,
        rollNo,
        hostelName,
        floorNo,
        roomNo,
        gender,
        password,
        profilePic: profilePic.url || ""
    })

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!userCreated) {
        throw new apiError(500, "Something went wrong while registering the user")
    }

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(200, userCreated, "Account created successfully !!!")
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { rollNo, password } = req.body
    if (!rollNo || !password) {
        throw new apiError(400, "Please enter both rollNo and password")
    }

    const user = await User.findOne({ rollNo: rollNo });

    if (!user) {
        throw new apiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid Password")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)

    const logginedUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: logginedUser, accessToken, refreshToken
                },
                "User logined successfully")
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new apiResponse(200, {}, "User successfully logout")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new apiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)

    if (!user) {
        throw new apiError(401, "Unauthorized request")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new apiError(401, "Refresh token is expired")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new apiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access Token Refreshed")
        )
})

const passwordChange = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!newPassword || newPassword.trim() == "") {
        throw new apiError(400, "Password is required")
    }
    const user = await User.findById(req.user._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new apiError(401, "Old password is incorrect")
    }
    user.password = newPassword
    user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Password changed successfully")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new apiResponse(200, req.user, "Current user details fetched successfully")
        )
})

const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!isValidObjectId(userId)) {
        throw new apiError(400, "Invalid user id")
    }

    const fetchUser = await User.findById(userId).select("-password -refreshToken")

    if (!fetchUser) {
        throw new apiError(404, "User not found")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, fetchUser, "User details fetched successfully")
        )
})

const changeDetails = asyncHandler(async (req, res) => {
    const { phoneNo, floorNo, hostelName, roomNo } = req.body
    if (!phoneNo && !floorNo && !hostelName && !roomNo) {
        throw new apiError(400, "At least one field is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                phoneNo,
                floorNo,
                hostelName,
                roomNo
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!user) {
        throw new apiError(404, "User not found")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, user, "User details successfully updated")
        )
})

const changeProfilePic = asyncHandler(async (req, res) => {
    const profilePic = req.file?.path

    if (!profilePic) {
        throw new apiError(400, "Image required")
    }

    const profilePicPath = await cloudnaryUpload(profilePic)

    const picUrl = await User.findById(req.user._id)

    let urlSeperator = []
    let url = picUrl.profilePic
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

    await cloudnaryDelete(urlSeperator[urlSeperator.length - 1])

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                profilePic: profilePicPath.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!user) {
        throw new apiError(404, "User not found")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, user, "User profile pic successfully updated")
        )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    passwordChange,
    changeDetails,
    getCurrentUser,
    refreshAccessToken,
    changeProfilePic,
    getUserById
}