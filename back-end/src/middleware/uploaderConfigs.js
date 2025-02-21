const multer = require("multer")
const fs = require("fs")
const path = require("path")

exports.multerStorage = (destination, allowTypes = /jpeg|jpg|png|webp/) => {
    if (!fs.existsSync(destination)){
        fs.mkdirSync(destination)
    }


    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, destination)
        },

        filename: function(req, file, cb){
            const uniqe = Date.now() * Math.floor(Math.random() * 1e9)
            const ext = path.extname(file.originalname);
            cb(null, `${uniqe}${ext}`)
        }
    })

    const fileFilter = function (req, file, cb) {
        if (allowTypes.test(file.mimetype)){
            cb(null, true)
        } else{
            cb(new Error("File type not allowed !!"));
        }
    }

    const uploader = multer({
        storage,
        limits: {
            fileSize: 512_000_000
        },
        fileFilter,
    })

    return uploader;
}