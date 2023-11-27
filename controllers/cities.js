const { cities } = require("../models")

module.exports = {
    getData: async (req, res, next) => {
        try {
            result = await cities.findAll()
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    },
    getCity: async (req, res, next) => {
        try {
            const city = await cities.findByPk(req.params.id)
            return res.status(200).send(city)
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    }
}