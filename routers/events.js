// routers/events.js
const express = require("express");
const { eventsController } = require("../controllers");
const router = express.Router();
const { reqParams, validateRole } = require("../middleware/condition");
const { uploader } = require("../helper/uploader");

router.get('/', eventsController.getData);
router.get('/event/:id', eventsController.getEvent);
router.get("/promoter/:id", eventsController.getDashboard);

router.post(
    "/",
    uploader("/").array("images"),
    eventsController.createDashboard);
router.delete("/:id", eventsController.deleteDashboard);
router.patch("/:id", eventsController.updateDashboard);


module.exports = router;