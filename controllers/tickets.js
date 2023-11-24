const { tickets } = require("../models");
const db = require("../models");

module.exports = {
    createTicket: async (req, res, next) => {
        const t = await db.sequelize.transaction();
        try {
            const {
                name,
                price,
                stock,
            } = req.body;

            if (
                name &&
                price &&
                stock
            ) {
                const result = await tickets.create({
                    price: others.price,
                    stock: others.stock,
                    event_id: result.dataValues.id
                }, {
                    transaction: t
                })
            }

            await t.commit()

        } catch (error) {
            await t.rollback();
            console.log("error create ticket", error);
            next();
        }
    },
    updateTicket: async (req, res, next) => {
        try {

        } catch (error) {
            await t.rollback();
            console.log("error update ticket", error);
            next();
        }
    },
}