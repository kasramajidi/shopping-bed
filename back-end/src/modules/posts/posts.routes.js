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

postRouter
    .route("/all-Post")
    .get(postController.getAll)

postRouter
    .route("/remove/:id")
    .delete(auth, postController.remove)

postRouter
    .route("/getone/:title")
    .get(postController.getOne)

postRouter
    .route("/getpost")
    .get(postController.getfeatured)
module.exports = postRouter;