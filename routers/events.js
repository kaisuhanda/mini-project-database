// routers/events.js
const express = require("express");
const { eventsController } = require("../controllers");
const router = express.Router();
const { validateRole } = require("../middleware/condition");
const { uploader } = require("../helper/uploader");

router.get('/', eventsController.getData);
router.get('/:id', eventsController.getEvent);
router.get("/promoter/:id", validateRole, eventsController.getDashboard);

router.post(
    "/",
    uploader("/").array("images"),
    eventsController.createDashboard);
router.delete("/:id", eventsController.deleteDashboard);
router.patch("/:id",
    uploader("/").array("images"),
    eventsController.updateDashboard);


module.exports = router;