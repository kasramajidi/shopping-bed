const UserModel = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { loginValidationSchema, registerValidationSchema } = require("./auth.validator")
exports.getAll = async (req, res) => {
    const user = await UserModel.findOne({}).lean()
    return res.status(200).json(user);
}


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        await registerValidationSchema.validate(
            {
                username,
                email,
                password
            },
            {
                abortEarly: false
            }
        )

        const emailUser = await UserModel.findOne({ email })

        if (emailUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({
            username,
            email,
            password: hashPassword,
        })

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )

        newUser.token = token;
        await newUser.save()

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "User registered successfully!",
            token,
            newUser
        })
    } catch (err) {
        console.log(err);
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        await loginValidationSchema.validate(
            {
                email,
                password
            },
            {
                abortEarly: false
            }
        )

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const newtoken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // ذخیره توکن جدید در دیتابیس
        await UserModel.findByIdAndUpdate(user._id, { token: newtoken });

        res.cookie("token", newtoken, {
            httpOnly: true, 
            secure: process.env.MODE_ENV === "production",
            sameSite: "Strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000, // ۷ روز
        });

        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.guest = async (req, res) => {
    try{
        const guestToken = jwt.sign(
            {role: "guest"},
            process.env.JWT_SECRET,
            {expiresIn: "30m"}
        )

        res.cookie("token", guestToken, {
            httpOnly: true,
            secure: process.env.MODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 30 * 60 * 1000,
        })

        res.status(200).json({
            message: "Guest login successful!",
        })
    }catch (err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}  