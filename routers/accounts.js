const router =require("express").Router();
const { accountsControllers }= require("../controllers");
const { validateRegis, validateToken } = require("../middleware/validation");
const jwt = require("jsonwebtoken")
const upload = require("../helper/multer");

router.get("/", accountsControllers.getData);
router.post("/register", validateRegis, accountsControllers.register);
router.post("/login", accountsControllers.login);
 router.post("/keeplogin", validateToken,accountsControllers.keepLogin);
router.post("/editPassword", validateToken, accountsControllers.editPassword);
router.post("/editProfile", validateToken, accountsControllers.editProfile);
router.post("/editPhotoProfile", upload.single("profilePicture"), validateToken, accountsControllers.editPhotoProfile);


router.post("/forgotPassword", accountsControllers.forgotPassword);
router.post("/resetPassword", accountsControllers.resetPassword);


router.get('/getPhoto', accountsControllers.getPhoto);



module.exports = router;


