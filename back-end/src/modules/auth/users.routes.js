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
    .post(auth, UserController.register)

UserRouter
    .route("/login")
    .post(auth, UserController.login)

UserRouter
    .route("/guest")
    .post(auth, UserController.guest)

UserRouter
    .route("/logout")
    .post(UserController.logout)

module.exports = UserRouter;