const multer = require("multer");
const fs = require("fs");
const path = require("path");

// مسیر ذخیره‌سازی تصاویر
const storagePath = path.join(__dirname, "../../public/images/posts");

// بررسی و ایجاد پوشه در صورت عدم وجود
if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

// تنظیمات `multer`
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storagePath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.floor(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // محدودیت حجم: 5 مگابایت
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error("File type not allowed!"));
        }
    },
});

module.exports = upload;
