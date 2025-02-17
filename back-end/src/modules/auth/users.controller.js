const UserModel = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.getAll = async (req, res) => {
    const user = await UserModel.findOne({}).lean()
    return res.status(200).json(user);
}


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username && !email && !password) {
            return res.status(400).json({ message: "Please provide username, email, and password." });
        }

        const emailUser = await UserModel.findOne({ email })

        if (emailUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        newUser.token = token;
        await newUser.save()

        res.status(201).json({
            message: "User registered successfully!",
            token,
            newUser
        })
    } catch (err) {
        console.log(err);
    }
}