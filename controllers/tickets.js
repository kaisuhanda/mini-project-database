const { tempTrue, tempFalse } = require("../helper/templateRes");
const { tickets } = require("../models")
const db = require("../models");

module.exports = {
    // kai
    getData: async (req, res, next) => {
        try {
            result = await tickets.findAll()
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    },

    // khalid
    createTicket: async (req, res, next) => {
        const t = await db.sequelize.transaction();
        try {
            const {
                type,
                price,
                stock,
                start_sales,
                end_sales
            } = req.body;

            if (
                type &&
                price &&
                stock &&
                start_sales &&
                end_sales
            ) {
                const result = await tickets.create({
                    type: type,
                    price: price,
                    stock: stock,
                    start_sales: start_sales,
                    end_sales: end_sales,
                    event_id: req.params.id
                }, {
                    transaction: t
                })
                console.log("RESSULLTTICKET", result);
                await t.commit()

                return res.status(201).send(tempTrue("", { result }))
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Check your input!"
                })
            }

        } catch (error) {
            await t.rollback();
            console.log("error create ticket", error);
            next();
        }
    },
    updateTicket: async (req, res, next) => {
        const t = await db.sequelize.transaction();
        try {
            const result = await tickets.update({
                type: req.body.type,
                stock: req.body.stock,
                price: req.body.price,
                start_sales: req.body.start_sales,
                end_sales: req.body.end_sales,
            },
                {
                    where: {
                        id: req.params.id
                    }
                },
                {
                    transaction: t
                })

            if (result[0]) {
                await t.commit()
                return res.status(200).send({
                    success: true,
                    message: "Ticket has been updated!"
                })
            } else {
                return res.status(400).send(tempFalse(400, "Event doesn't existed"))
            }
        } catch (error) {
            await t.rollback();
            console.log("error update ticket", error);
            next();
        }
    },
    deleteTicket: async (req, res, next) => {
        const t = await db.sequelize.transaction();
        try {
            const result = await tickets.destroy({
                where: {
                    id: req.params.id
                },
            });

            if (result) {
                return res.status(200).send(tempTrue("Ticket has been deleted successfully", result))
            } else {
                return res.status(400).send(tempFalse(400, "Ticket doesn't existed"))
            }
        } catch (error) {
            await t.rollback();
            console.log("error deleting ticket", error);
            next();
        }
    },
}
