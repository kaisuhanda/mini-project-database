const { categoriesController } = require("../controllers");

const router = require("express").Router();

router.get("/", categoriesController.getAll);


module.exports = router;