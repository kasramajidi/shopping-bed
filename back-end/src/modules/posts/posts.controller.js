const PostModel = require("./../../models/Post")
const mongoose = require("mongoose")

exports.createPost = async (req, res) => {
    try {
        const { title, company, description, category, price } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const imageUrl = `/images/posts/${req.file.filename}`; // مسیر ذخیره شده در دیتابیس

        const newPost = new PostModel({
            title,
            company,
            description,
            category,
            price,
            image: imageUrl,
        });

        await newPost.save();

        res.status(201).json({
            message: "Post created successfully!",
            post: newPost,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

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
        const { title } = req.params

        if (!title || title.length < 1) {
            return res.status(401).json({
                message: "Title is required"
            })
        }

        const getOne = await PostModel.find({ title: { $regex: title, $options: "i" } })

        if (getOne.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        res.status(200).json(getOne)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getfeatured = async (req, res) => {
    try {

        let { featured } = req.query


        const post = await PostModel.find(featured !== undefined ? { featured } : {})

        if (!post) {
            return res.status(400).json({
                message: "No products found"
            },
            )
        }

        res.status(200).json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.filterPost = async (req, res) => {
    try {
        const {
            search,
            category,
            company,
            order,
            price,
            shipping,
            page,
            limit
        } = req.query

        let queryObject = {};

        // filter search
        if (search) {
            queryObject.title = { $regex: search, $options: "i" };
        }

        // category
        if (category && category !== "All") {
            queryObject.category = category
        }

        // company

        if (company && company !== "All") {
            queryObject.company = company
        }

        // price

        if (price) {
            queryObject.price = { $lte: Number(price) }
        }

        // free

        if (shipping) {
            queryObject.shipping = shipping === "true"
        }

        // order

        let sortOrder = {};
        if (order) {
            if (order === "a-z") sortOrder.title = 1;
            if (order === "z-a") sortOrder.title = -1;
            if (order === "low") sortOrder.price = 1;
            if (order === "high") sortOrder.price = -1;
        }

        // arrangement

        let pagenum = parseInt(page) || 1;
        let limitnum = parseInt(limit) || 10;
        let skip = (pagenum - 1) * limitnum;

        // find post

        const post = await PostModel.find(queryObject).sort(sortOrder).skip(skip).limit(limit)

        if (!post) {
            return res.status(404).json({
                message: "not found post"
            })
        }

        const allPost = await PostModel.countDocuments(queryObject)
        const totalPage = Math.ceil(allPost / limit)

        res.status(200).json({
            currentPage: page,
            totalPage,
            allPost,
            post
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            category,
            price,
            colors,
        } = req.body

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(402).json({ message: "Invalid ID format" });
        }
        const updatePost = await PostModel.findByIdAndUpdate({ _id: id }, {
            title,
            company,
            description,
            category,
            price,
            colors,
        })


        res.status(200).json({
            message: "This post has been successfully update",
            updatePost
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getOne = async (req, res) => {
    try {
        const product = await PostModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}