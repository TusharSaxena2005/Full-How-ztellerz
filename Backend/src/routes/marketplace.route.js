import { Router } from "express"
import { addItem, deleteItem, getAllItem, getItemByCategory, getItemByHostelName, getItemByUserId, getItemById } from "../controllers/marketplace.controller.js"
import { VerifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js"

const marketPlace = Router();
marketPlace.use(VerifyJWT);

marketPlace.route("/add-item").post(upload.single("itemImage"), addItem)
marketPlace.route("/delete-item/:itemId").get(deleteItem)
marketPlace.route("/get-all-item").get(getAllItem)
marketPlace.route("/item-by-id/:itemId").get(getItemById)
marketPlace.route("/filtered-item/:category").get(getItemByCategory)
marketPlace.route("/filtered-byHostelName-item").get(getItemByHostelName)
marketPlace.route("/add-item/:userId").get(getItemByUserId)

export { marketPlace }