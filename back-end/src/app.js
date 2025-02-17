const express = require("express")
const app = express()

const UserRouter = require("./modules/auth/users.routes")
const ApiRouter = require("./modules/api/swagger.routes")

//* BodyParser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));


//* Routes
app.use("/auth", UserRouter)
app.use("/api", ApiRouter)

//* 404 Error Handler
app.use((req, res) => {
    console.log("this path is not found:", req.path);
    return res
      .status(404)
      .json({ message: "404! Path Not Found. Please check the path/method" });
  });

module.exports = app;