const OrderModel = require("../../models/Order")
const PostModel = require("./../../models/Post")

exports.createOrder = async (req, res) => {
    try {
        const { name, address, postID } = req.body;

        if (!name || !address || !postID) {
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

        const postExists = await PostModel.findById(postID);
        if (!postExists) {
            return res.status(403).json({ message: "Post not found" });
        }

        const newOrder = await OrderModel.create({
            name,
            address,
            post: postID,
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