const express = require("express");
const { categoriesController } = require("../controllers");

const router = express.Router();

router.get('/', categoriesController.getData);
router.get("/getCat", categoriesController.getAll);

module.exports = router;
