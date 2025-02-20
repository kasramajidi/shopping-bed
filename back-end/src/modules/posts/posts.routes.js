const express = require("express")
const postController = require("./posts.controller")
const postRouter = express.Router()
const auth = require("./../../middleware/auth")
const {multerStorage} = require("./../../middleware/uploaderConfigs")

const uploder = multerStorage(
    "public/images/posts",
    /jpeg|jpg|png|webp/
)

postRouter
    .route('/create-post')
    .post(auth, uploder.single("image"), postController.createPost)


module.exports = postRouter;