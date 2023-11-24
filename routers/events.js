const router = require("express").Router();
const { eventsController } = require("../controllers");
const { reqParams } = require("../middleware/condition");
const { uploader } = require("../helper/uploader")

router.post(
    "/",
    uploader("/").array("images"),
    eventsController.create);
router.delete("/:id", eventsController.delete);
router.patch("/:id", eventsController.update);
router.get("/:id", eventsController.get);

module.exports = router;