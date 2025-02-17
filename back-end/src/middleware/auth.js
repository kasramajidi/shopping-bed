const jwt = require("jsonwebtoken")
const UserModel = require("./../models/User")

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        if (!authHeader) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"
            })
        }
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token){
            return res.status(401).json({
                message: "Unauthorized: Invalid token format"
            })
        }

        const jwtPyload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(jwtPyload.id).select("-password").lean()

        if (!user){
            return res.status(401).json({
                message: "Unauthorized: user not found"
            })
        }

        req.user = user

        next()
    } catch (err) {
        next(err)
    }
}