import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        phoneNo: {
            type: Number,
            required: true,
            unique: true,
            trim: true
        },
        mailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        rollNo: {
            type: Number,
            required: true,
            unique: true,
            trim: true
        },
        hostelName: {
            type: String,
            required: true
        },
        roomNo: {
            type: Number,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true,
            trim: true
        },
        profilePic: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        },
    },
    { timestamps: true }
)

export const User = mongoose.model("User", userSchema)