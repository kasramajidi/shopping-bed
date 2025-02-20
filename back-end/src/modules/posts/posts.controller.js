const PostModel = require("./../../models/Post")

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