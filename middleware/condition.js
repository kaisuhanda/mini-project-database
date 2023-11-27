const { events } = require("../models");

module.exports = {
    reqParams: (req, res, next) => {
        try {

        } catch (error) {

        }
        console.log("PARAMS", typeof (req.params.id));
        console.log("EVENTS", req.params.id === events.findOne({
            where: {
                promoter_id: req.params.id
            }
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

    validateRole: (req, res, next) => {
        try {
            console.log("REQ TOKEN", req.token);

            // if (!req.token) {
            //     return res.status(400).send({
            //         success: false,
            //         message: "You do not have a token",
            //     });
            // } else {
            //     const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
            //     if (!verifyData) {
            //         return res.status(401).send({
            //             success: false,
            //             message: "Unauthorized request",
            //         });
            //     }
            //     req.userData = verifyData;
            //     next();
            // }
        } catch (error) {
            console.log(error);
            return res.status(400).send("Invalid Token");
        }
    },
}