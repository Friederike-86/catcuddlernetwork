const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        const destinationDirectory = __dirname + "/uploads";
        callback(null, destinationDirectory);
    },
    filename: function (request, file, callback) {
        uidSafe(26).then((uuid) => {
            const fileExtension = path.extname(file.originalname);
            const filename = uuid + fileExtension;
            callback(null, filename);
        });
    },
});
const uploader = multer({
    limits: {
        filesize: 542880,
    },
    storage: diskStorage,
});

module.exports = uploader;
