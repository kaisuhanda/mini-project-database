// routers/events.js
const express = require("express");
const { eventsController } = require("../controllers");

const router = express.Router();

router.get('/', eventsController.getData);
router.get('/:id', eventsController.getEvent)

module.exports = router;


// const { eventsController } = require("../controllers");

// const router = require("express").Router();

// router.get('/', eventsController.getData);

// module.exports = router;
