import { Router } from "express";
import { registerUser, loginUser, logoutUser, passwordChange, changeDetails, getCurrentUser, refreshAccessToken } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { VerifyJWT } from "../middleware/auth.middleware.js"

const userRouter = Router()

userRouter.route("/register").post(upload.fields([
    {
        name: "profilePic",
        maxCount: 1
    }
]
), registerUser)

userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(VerifyJWT,logoutUser)
userRouter.route("/refresh-accessToken").post(refreshAccessToken)
userRouter.route("/change-password").post(VerifyJWT,passwordChange)
userRouter.route("/current-user").get(VerifyJWT,getCurrentUser)
userRouter.route("/update-details").patch(VerifyJWT,changeDetails)

export { userRouter }