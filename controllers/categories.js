const { categories } = require("../models")
const { raw } = require("mysql2");

module.exports = {
    //    kai
    getData: async (req, res, next) => {
        try {
            result = await categories.findAll()
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    },

    // khalid
    getAll: async (req, res, next) => {
        try {
            const result = await categories.findAll()

            if (result.length) {
                return res.status(200).send({
                    success: true,
                    result: result
                })
            } else {
                return res.status(404).send({
                    success: false,
                    message: "You Don't Have Categories"
                })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error: error
            })
        }
    },
}