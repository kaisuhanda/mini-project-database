const { tempTrue, tempFalse } = require("../helper/templateRes");
const { events, categories, sequelize, tickets, cities, images } = require("../models");
const db = require("../models");
// const categoriesController = require("./categories");
module.exports = {
    create: async (req, res, next) => {
        const t = await db.sequelize.transaction();
        try {
            console.log("REQ.BODY", req.body);
            console.log("REQ.FILES", req.files);
            const {
                promoter_id,
                name,
                start_date,
                end_date,
                description,
                location,
                image,
                categories_id,
                ...others
            } = req.body;
            console.log("OTHERS", others);
            console.log("REQ>BODY.cities", req.body.city);
            if (
                promoter_id &&
                name.length <= 50 &&
                start_date &&
                end_date &&
                description.length <= 2000 &&
                location &&
                categories_id &&
                others.stock &&
                others.type
            ) {
                const result = await events.create(
                    req.body,
                    {
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt"
                            ]
                        }
                    },
                    { transaction: t });

                const result2 = await tickets.create({
                    type: others.type,
                    price: others.price,
                    stock: others.stock,
                    event_id: result.dataValues.id
                }, {
                    transaction: t
                })

                // const result3 = await cities.create({
                //     city: others.city
                // }, { transaction: t })
                // console.log("REQ.FILES", req.files);

                for (let i = 0; i < req.files.length; i++) {
                    // console.log("IIIII", i);
                    console.log("REQ>FILEESS", req.files[i]);
                    await images.create({
                        image: req.files[i].filename,
                        event_id: result.dataValues.id
                    })
                }

                console.log("result", result);

                await t.commit();

                return res.status(201).send(tempTrue("", { result, result2 }))
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Check input"
                })
            }

        } catch (error) {
            await t.rollback();
            console.log(error);
            return res.status(500).send({ success: false, error })
        }
    },
    delete: async (req, res, next) => {
        try {
            const result = await events.destroy({
                where: {
                    id: req.params.id
                },
            });
            console.log("RSULT", result);
            if (result) {
                return res.status(200).send({
                    success: true,
                    message: "Event has been deleted"
                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Event doesn't exist"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const result = await events.update({
                name: req.body.name,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description,
                location: req.body.location,
                image: req.body.image,
                start_sales: req.body.start_sales,
                end_sales: req.body.end_sales,
                categories_id: req.body.categories_id
            }, {
                where: {
                    id: req.params.id
                }
            });
            console.log("RESULT", result[0]);
            if (result[0]) {
                return res.status(200).send({
                    success: true,
                    message: "Event has been updated",
                });
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Event doesn't existed"
                })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    get: async (req, res, next) => {
        try {
            const result = await events.findAll({
                include: [
                    {
                        model: categories,
                        attributes: [
                            "category"
                        ]
                    }
                ],
                where: {
                    promoter_id: req.params.id
                },
                raw: true
            });
            console.log(result);

            if (result.length) {
                return res.status(200).send(result)
            } else {
                return res.status(400).send({
                    success: false,
                    message: "This Promoter doesn't have any event"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },
}