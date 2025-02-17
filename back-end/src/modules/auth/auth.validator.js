const yup = require("yup")

exports.registerValidationSchema = yup.object({
    username: yup
        .string()
        .min(3, "Username must be at least 3 chars long")
        .required("Username is required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 chars long")
        .max(15, "Password must be at least 15 chars long"),
})

exports.loginValidationSchema = yup.object({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 chars long")
        .max(15, "Password must be at least 15 chars long"),
})