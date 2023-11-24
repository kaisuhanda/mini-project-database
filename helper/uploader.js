const multer = require("multer");
const fs = require("fs");

module.exports = {
    uploader: (directory) => {
        const defaultDir = "./public";

        const storageUploader = multer.diskStorage({

            //    destination
            destination: (req, file, cb) => {
                const pathDir = directory ? defaultDir + directory : defaultDir;

                if (fs.existsSync(pathDir)) {
                    console.log(`Directory ${pathDir} EXIST`);
                    cb(null, pathDir);
                } else {
                    fs.mkdir(pathDir, (error) => {
                        if (error) {
                            console.log("Error while creating directory", error);
                        }

                        return cb(error, pathDir)
                    });
                }
            },

            // filename
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`)
            },
        });

        const fileFilter = (req, file, cb) => {
            console.log("CHECK FILE FROM REQ CLIENT, ", file);

            if (file.originalname.toLowerCase().includes("png") || file.originalname.toLowerCase().includes("jpg") || file.originalname.toLowerCase().includes("jpeg")) {
                cb(null, true);
            } else {
                cb(new Error("The file(s) extension only PNG or JPG or JPEG. Please check your file and try again."), false)
            }
        };

        return multer({ storage: storageUploader, fileFilter });
    },
};