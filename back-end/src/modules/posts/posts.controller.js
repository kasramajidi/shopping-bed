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
            image: {
                filename: req.file.filename,
                path: imageUrl,
            },
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

exports.getAllAndFilter = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        const post = await PostModel.find({}).skip(skip).limit(pageSize);

        const countPost = await PostModel.countDocuments();

        const pageCount = Math.ceil(countPost / pageSize);

        const {
            search,
            category,
            company,
            order,
            price,
            shipping
        } = req.query;

        let filteredPosts = post;

        if (search) {
            filteredPosts = filteredPosts.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category && category !== "All") {
            filteredPosts = filteredPosts.filter((p) => p.category === category);
        }

        if (company && company !== "All") {
            filteredPosts = filteredPosts.filter((p) => p.company === company);
        }

        if (price) {
            filteredPosts = filteredPosts.filter((p) => p.price <= Number(price));
        }

        if (shipping) {
            filteredPosts = filteredPosts.filter((p) => p.shipping === (shipping === "true"));
        }

        if (order) {
            if (order === "a-z") {
                filteredPosts = filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
            } else if (order === "z-a") {
                filteredPosts = filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
            } else if (order === "low") {
                filteredPosts = filteredPosts.sort((a, b) => a.price - b.price);
            } else if (order === "high") {
                filteredPosts = filteredPosts.sort((a, b) => b.price - a.price);
            }
        }

        const filteredCount = filteredPosts.length;
        const totalPage = Math.ceil(filteredCount / pageSize);
        const paginatedPosts = filteredPosts.slice(skip, skip + pageSize);

        res.status(200).json({
            attributes: paginatedPosts,
            meta: {
                pagination: {
                    page,
                    pageSize,
                    totalPage,
                    filteredCount
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


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