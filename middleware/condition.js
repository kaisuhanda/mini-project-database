const { events } = require("../models");

module.exports = {
    reqParams: (req, res, next) => {
        console.log("PARAMS", typeof (req.params.id));
        console.log("EVENTS", req.params.id === events.findOne({

        }));
        // if (req.params.id) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Insert Event ID"
        //     })
        // } else {
        //     next();
        // }
    },
}