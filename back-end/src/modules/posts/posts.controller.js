const PostModel = require("./../../models/Post")
const mongoose = require("mongoose")

exports.createPost = async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            category,
            price,
            colors,
        } = req.body

        if (!title || !company || !description || !category || !price || !colors) {
            return res.status(400).json({
                message: "Please enter title, company, description, category, image, price, colors"
            })
        }

        if (!req.file) {
            return res.status(401).json({
                message: "Media is required !!"
            })
        }

        const findTittle = await PostModel.findOne({ title }).lean()

        if (findTittle) {
            return res.status(402).json({
                message: "tiltle is repetitive"
            })
        }

        const pictureUrlPath = `/images/posts/${req.file.filename}`

        const newPost = await PostModel.create({
            title,
            company,
            description,
            category,
            image: {
                filename: req.file.filename,
                path: pictureUrlPath,
            },
            price,
            colors,
        })

        newPost.save()

        res.status(200).json(newPost);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 10
        const skip = (page - 1) * pageSize

        const post = await PostModel.find({}).skip(skip).limit(pageSize)

        const countPost = await PostModel.countDocuments()

        const pageCount = Math.ceil(countPost / pageSize)

        res.status(200).json({
            attributes: post,
            meta: {
                pagination: {
                    page,
                    pageSize,
                    pageCount,
                    countPost
                }
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(402).json({ message: "Invalid ID format" });
        }
        const removePost = await PostModel.findOneAndDelete({ _id: id })

        if (!removePost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "This post has been successfully deleted"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getOne = async (req, res) => {
    try {
        const {title} = req.params

        if (!title || title.length < 1){
            return res.status(401).json({
                message: "Title is required"
            })
        }

        const getOne = await PostModel.find({title: { $regex: title, $options: "i" }})

        if (getOne.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        res.status(200).json(getOne)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}