const express = require("express");
const { ticketsController } = require("../controllers");

const router = express.Router();

router.get('/', ticketsController.getData);

// khalid
router.post('/:id', ticketsController.createTicket);
router.patch('/:id', ticketsController.updateTicket);
router.delete('/:id', ticketsController.deleteTicket);

module.exports = router;
