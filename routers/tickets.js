const express = require("express");
const { ticketsController } = require("../controllers");

const router = express.Router();

router.get('/', ticketsController.getData);

module.exports = router;
