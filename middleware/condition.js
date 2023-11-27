const { events } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
    validateRole: (req, res, next) => {
        try {
            // console.log("REQ TOKEN", req.token);

            if (!req.token) {
                return res.status(400).send({
                    success: false,
                    message: "You do not have a token",
                });
            } else {
                const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
                // console.log("VERIFY DATA", verifyData);
                if (verifyData.role === "promoter") {
                    if (!verifyData) {
                        return res.status(401).send({
                            success: false,
                            message: "Unauthorized request",
                        });
                    }
                    req.userData = verifyData;
                    next();
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "You are not a Promoter"
                    });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send("Invalid Token");
        }
    },
}