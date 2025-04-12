const OrderModel = require("../../models/Order")
const PostModel = require("./../../models/Post")
const mongoose = require("mongoose")

exports.createOrder = async (req, res) => {
    try {
        const { name, address, orderTotal, numItemsInCart } = req.body;

        if (!name || !address) {
            return res.status(400).json({ message: "Please enter name, address, and postID" });
        }

        const nameRegex = /^[a-z0-9_-]{3,15}$/;
        if (!nameRegex.test(name)) {
            return res.status(401).json({ message: "Name must be at least 3 chars long" });
        }

        const addressRegex = /^[a-z0-9_-]{3,60}$/;
        if (!addressRegex.test(address)) {
            return res.status(402).json({ message: "Address must be at least 3 chars long" });
        }


        const newOrder = await OrderModel.create({
            name,
            address,
            orderTotal,
            numItemsInCart
        });

        res.status(200).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getAll = async (req, res) => {
    try{
        const getAll = await OrderModel.find({}).populate("post").lean()

        res.status(200).json(getAll);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.remove = async (req, res) => {
    try{
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(402).json({ message: "Invalid ID format" });
        }
        const removeOrder = await OrderModel.findOneAndDelete({ _id: id })

        if (!removeOrder) {
            return res.status(404).json({ message: "order not found" });
        }

        res.status(200).json({
            message: "This order has been successfully deleted"
        })
    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.update = async (req, res) => {
    try{
        const {
            name, 
            address, 
            postID 
        } = req.body
        
        if (!name || !address || !postID) {
            return res.status(400).json({ message: "Please enter name, address, and postID" });
        }

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(402).json({ message: "Invalid ID format" });
        }
        const updateOrder = await OrderModel.findByIdAndUpdate({ _id: id }, {
            name, 
            address, 
            postID 
        })


        res.status(200).json({
            message: "This post has been successfully update",
            updateOrder
        })
    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}