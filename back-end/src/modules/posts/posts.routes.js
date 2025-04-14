const express = require("express")
const postController = require("./posts.controller")
const postRouter = express.Router()
const auth = require("./../../middleware/auth")
const upload = require("./../../middleware/uploaderConfigs")


postRouter
    .route('/create-post')
    .post(upload.single("image"), postController.createPost);

postRouter
    .route("/all-Post")
    .get(postController.getAllAndFilter);

postRouter
    .route("/remove/:id")
    .delete(auth, postController.remove)

postRouter
    .route("/getone/:title")
    .get(postController.getOne)

postRouter
    .route("/getpost")
    .get(postController.getfeatured)

postRouter
    .route("/update-post")
    .put(auth, postController.update)

postRouter
    .route("/getpost/:id")
    .get(postController.getOne)

postRouter
    .route("/update-image/:id")
    .put(upload.single("image"), postController.updateImage)

module.exports = postRouter;