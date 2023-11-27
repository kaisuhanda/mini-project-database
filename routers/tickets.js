const express = require("express");
const { ticketsController } = require("../controllers");
const { validateRegis, validateToken } = require("../middleware/validation");

const router = express.Router();

router.get('/', ticketsController.getData);

router.post('/transactions',validateToken, ticketsController.createTransaction);
router.get('/transactions/:userId', ticketsController.getTransactionsByUserId);

module.exports = router;
