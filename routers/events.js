// routers/events.js
const express = require("express");
const { eventsController } = require("../controllers");
const router = express.Router();
const { reqParams } = require("../middleware/condition");
const { uploader } = require("../helper/uploader");

router.get('/', eventsController.getData);
router.get('/:id', eventsController.getEvent);
router.post(
    "/",
    uploader("/").array("images"),
    eventsController.create);
router.delete("/:id", eventsController.delete);
router.patch("/:id", eventsController.update);
router.get("/:id", eventsController.get);


module.exports = router;