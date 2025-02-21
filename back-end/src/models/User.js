const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        enum: ["local", "forgin"],
        default: "local"
    },
    confirmed: {
        type: Boolean,
        default: true,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    token: { 
        type: String, 
        default: null 
    },

}, {timestamps: true})



const UserModel = mongoose.model("User", schema);

module.exports = UserModel;