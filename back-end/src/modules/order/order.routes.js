const express = require('express');
const orderController = require("./order.controller")
const orderRouter = express.Router()
const auth = require("./../../middleware/auth")

orderRouter
    .route("/create-order")
    .post(orderController.createOrder)

orderRouter
    .route("/get-all-order")
    .get(orderController.getAll)

orderRouter
    .route("/remove/:id")
    .delete(auth, orderController.remove)

orderRouter
    .route("/update-order/:id")
    .put(auth, orderController.update)
module.exports = orderRouter
