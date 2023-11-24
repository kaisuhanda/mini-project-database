const express = require("express");
const { categoriesController } = require("../controllers");

const router = express.Router();

router.get('/', categoriesController.getData);

module.exports = router;
