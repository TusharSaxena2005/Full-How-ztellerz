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
        floorNo: {
            type: Number,
            required: true,
            trim: true
        },
        rollNo: {
            type: Number,
            required: true,
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
        },
        refreshToken: {
            type: String
        },
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            rollNo: this.rollNo,
            email: this.email,
            phone: this.phone
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)