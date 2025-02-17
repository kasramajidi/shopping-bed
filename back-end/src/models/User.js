const mongoose = require("mongoose")
const CounterId = require("./../utils/CounterId")
const bcrypt = require("bcrypt")
const schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
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

})

//* Before the ID is saved
schema.pre("save", async (next) => {
    try {
        if (!this.id) {
            const counter = await CounterId.findOneAndUpdate(
                { name: "user_id" },
                { $inc: { value: 1 } },
                { new: true, upsert: true }
            );
            this.id = counter.value;
        }
        next()
    } catch (err) {
        next(err)
    }
})

//* Convert password to hash
schema.pre("save", async function (next){
    try{
        if (this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 10);
        }
        next()
    }catch(err){
        next(err)
    }
})

const UserModel = mongoose.model("User", schema);

module.exports = UserModel;