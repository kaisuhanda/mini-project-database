const { categories } = require("../models")

module.exports = {
    getData: async (req, res, next) => {
        try {
            result = await categories.findAll()
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }
}