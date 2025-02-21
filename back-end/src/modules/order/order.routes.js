const express = require('express');
const orderController = require("./order.controller")
const orderRouter = express.Router()
const auth = require("./../../middleware/auth")

orderRouter
    .route("/create-order")
    .post(auth, orderController.createOrder)

orderRouter
    .route("/get-all-order")
    .get(auth, orderController.getAll)
module.exports = orderRouter
