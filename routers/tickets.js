const express = require("express");
const { ticketsController } = require("../controllers");
const { validateToken } = require("../middleware/validation")
const router = express.Router();
// kai
router.get('/', ticketsController.getData);
router.get('/:id', ticketsController.getTicket)

// khalid
router.post('/:id', ticketsController.createTicket);
router.patch('/:id', ticketsController.updateTicket);
router.delete('/:id', ticketsController.deleteTicket);

// nanda
router.post('/transactions', validateToken, ticketsController.createTransaction);
router.get('/transactions/:userId', ticketsController.getTransactionsByUserId);

module.exports = router;
