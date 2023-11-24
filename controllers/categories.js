const { raw } = require("mysql2");
const { categories } = require("../models")

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const result = await categories.findAll({ raw: true })

            if (result.length) {
                return res.status(200).send({
                    success: true,
                    result: result
                })
            } else {
                return res.status(400).send({
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
    }
}