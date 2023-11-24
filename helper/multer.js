const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 1 MB limit, adjust as needed
  },
  fileFilter: fileFilter,
});

module.exports = upload;

// // // multer.js
//  const multer = require("multer");

// // // Konfigurasi penyimpanan file
//  const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, "./uploads"); 
//    },
//    filename: function (req, file, cb) {
//      cb(null, Date.now() + "_" + file.originalname);
//    },
//  });

//  const upload = multer({ storage: storage });

//  module.exports = upload;

// const multer = require("multer");
// const fs = require('fs');

// module.exports ={
//     uploader:(directory)=>{
//         // lokasi utama penyimpanan file
//         const defalutDir='./uploads'

//         //konfigurasi multer
//         const storageUploader =multer.diskStorage({
//             destination:(req,file,cb)=>{
//                 const pathDir = directory ? defalutDir + directory : defalutDir;
//                 //pemeriksaan direktori
//                 if(fs.existsSync(pathDir)){
//                     // jika directory ditemukan maka parameter cb dari destination akan menyimpan file 
//                     console.log(`directory ${defalutDir} EXIST`);
//                     cb(null,pathDir);
//                 }else{
//                     fs.mkdir(pathDir,(err)=>{
//                         if(err){
//                             console.log('error create directory')
//                         }
//                        return cb(err,pathDir)
//                     });
//                 }

//             },
//             filename:(req,file,cb)=>{
//                 cb(null, `${Date.now()} - ${file.originalname}`);
//             }
//         });
//         const fileFilter=(req,file,cb)=>{
//             console.log(file);
//             if(file.originalname.toLowerCase().includes(".png") || file.originalname.toLowerCase().includes(".jpg") ){
//                 cb(null, true);
//             }else{
//                 cb(new Error('your file extention are denided .only png or jpg',false));
//             }
//         };
//         return multer({storage:storageUploader, fileFilter });

//     },
// };


