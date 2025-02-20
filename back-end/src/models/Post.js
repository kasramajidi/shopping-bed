const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        path: {
            type: String,
            required: true
        },

        filename: {
            type: String,
            required: true
        },
    },
    price:{
        type: String,
        required: true
    },
    shipping: {
        type: Boolean,
        default: false
    },
    colors: {
        type: [String],
        default: [],
        required: true
    }

}, { timestamps: true })

const PostModel = mongoose.model("Post", schema)

module.exports = PostModel;