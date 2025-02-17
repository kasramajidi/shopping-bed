const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true, 
        unique: true
    },
    value: {
        type: Number,
        default: 0
    }
}) 

const CounterId = mongoose.model("CounterId", schema)

module.exports = CounterId;