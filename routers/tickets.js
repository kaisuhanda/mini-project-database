const express = require("express");
const { ticketsController } = require("../controllers");

const router = express.Router();

router.get('/', ticketsController.getData);
router.get('/:id', ticketsController.getTicket)

// khalid
router.post('/:id', ticketsController.createTicket);
router.patch('/:id', ticketsController.updateTicket);
router.delete('/:id', ticketsController.deleteTicket);

module.exports = router;
