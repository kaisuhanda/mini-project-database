const express = require("express");
const { ticketsController } = require("../controllers");

const router = express.Router();

router.get('/', ticketsController.getData);
router.get('/:id', ticketsController.getTicket)

module.exports = router;
