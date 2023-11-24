const express = require("express");
const { citiesController } = require("../controllers");

const router = express.Router();

router.get('/', citiesController.getData);
router.get('/:id', citiesController.getCity)

module.exports = router;
