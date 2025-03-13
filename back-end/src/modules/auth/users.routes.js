const express = require("express")
const UserController = require("./users.controller")
const UserRouter = express.Router()
const auth = require("../../middleware/auth")
const IsAdmin = require("../../middleware/IsAdmin")

UserRouter
    .route("/userAll")
    .get(auth, IsAdmin, UserController.getAll)

UserRouter
    .route("/register")
    .post(UserController.register)

UserRouter
    .route("/login")
    .post(UserController.login)

UserRouter
    .route("/guest")
    .post(UserController.guest)

UserRouter
    .route("/logout")
    .post(UserController.logout)

module.exports = UserRouter;