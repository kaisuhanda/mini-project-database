const express = require("express");
const { categoriesController } = require("../controllers");

const router = express.Router();

router.get('/', categoriesController.getData);
router.get("/get-cat", categoriesController.getAll);

module.exports = router;
