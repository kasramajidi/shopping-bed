const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    post:{
        type: mongoose.Types.ObjectId,
        ref: "Post",
    },
    chargeTotal: {
        type: Number,
    },
    numItemsInCart: {
        type: Number,
    },
    orderTotal:{
        type: Number,
        required: true
    }

}, {timestamps: true})

const OrderModel = mongoose.model("Order", schema);

module.exports = OrderModel

