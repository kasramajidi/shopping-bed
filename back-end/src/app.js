const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const UserRouter = require("./modules/auth/users.routes")
const ApiRouter = require("./modules/api/swagger.routes")
const postRouter = require("./modules/posts/posts.routes")
const orderRouter = require("./modules/order/order.routes")
const path = require("path")
//* BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* cookie parser 
app.use(cookieParser())
app.use(cors())

//* Routes
app.use("/auth", UserRouter)
app.use("/api", ApiRouter)
app.use("/posts", postRouter)
app.use("/orders", orderRouter)


app.use("/images/posts", express.static(path.join(__dirname, "../public/images/posts")));

//* 404 Error Handler
app.use((req, res) => {
    console.log("this path is not found:", req.path);
    return res
      .status(404)
      .json({ message: "404! Path Not Found. Please check the path/method" });
  });

module.exports = app;