
const { events, tickets, Sequelize, categories, sequelize, cities, images } = require("../models");
const { tempTrue, tempFalse } = require("../helper/templateRes");
const db = require("../models");

module.exports = {
    // kai
    getData: async (req, res, next) => {
        try {
            const { category_id, city_id, price, time, sortby, id } = req.query;
            let condition = {};
            let sort = null
            if (category_id) {
                condition.category_id = category_id;
            }
            if (city_id) {
                if (city_id.toLowerCase() === 'null') {
                    condition.city_id = null;
                } else {
                    condition.city_id = city_id;
                }
            }
            if (price) {
                if (price === '0') {
                    condition['$tickets.price$'] = 0;
                }
            }
            if (time) {
                const currentDate = new Date();
                const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
                const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

                if (time === 'today') {
                    condition.start_date = {
                        [Sequelize.Op.between]: [startOfDay.toISOString(), endOfDay.toISOString()],
                    };
                } else if (time === 'tomorrow') {
                    const tomorrow = new Date(currentDate);
                    tomorrow.setDate(currentDate.getDate() + 1);
                    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
                    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

                    condition.start_date = {
                        [Sequelize.Op.between]: [startOfTomorrow.toISOString(), endOfTomorrow.toISOString()],
                    };
                } else if (time === 'this-week') {
                    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 6);

                    condition.start_date = {
                        [Sequelize.Op.between]: [startOfWeek.toISOString(), endOfWeek.toISOString()],
                    };
                } else if (time === 'this-month') {
                    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

                    condition.start_date = {
                        [Sequelize.Op.between]: [startOfMonth.toISOString(), endOfMonth.toISOString()],
                    };
                }
            }

            if (sortby) {
                switch (sortby) {
                    case 'nearest-time':
                        sort = [['start_date', 'ASC']]
                        break;
                    case 'furthest-time':
                        sort = [['start_date', 'DESC']]
                        break;
                    case 'price-asc':
                        sort = [[{ model: tickets }, 'price', 'ASC']]
                        break;
                    case 'price-desc':
                        sort = [[{ model: tickets }, 'price', 'DESC']]
                        break;
                    default:
                        sort = [['id', 'ASC']]
                        break;
                }
            }

            if (id) {
                condition.id = id
            }

            const result = await events.findAll({
                include: [{
                    model: tickets,
                    required: false,
                    order: [['price', 'ASC']],
                    attributes: [
                        ['id', 'ticket_id'],
                        [Sequelize.fn('MIN', Sequelize.col("tickets.price")), "start_from"]
                    ],
                }],
                where: condition,
                group: [
                    'events.id',
                    'events.promoter_id',
                    'events.category_id',
                    'events.city_id',
                    'events.name',
                    'events.description',
                    'events.location',
                    // 'events.image',
                    'events.start_date',
                    'events.end_date',
                    'events.createdAt',
                    'events.updatedAt',
                    'tickets.id'
                ],
                subQuery: false,
                separate: true,
                order: sort
            });

            console.log("RESULT BABY", result);
            return res.status(200).send(result);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    getEvent: async (req, res, next) => {
        try {
            const event = await events.findByPk(req.params.id)
            console.log("LOG event KAI", event);
            return res.status(200).send(event)
        } catch (error) {
            console.log(error);
            return res.status(404).send(error)
        }
    },

    // khalid
    createDashboard: async (req, res, next) => {
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
                category_id,
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
                category_id &&
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
    deleteDashboard: async (req, res, next) => {
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


            // const categoriesController = require("./categories");

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    updateDashboard: async (req, res, next) => {
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
                category_id: req.body.category_id
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
    getDashboard: async (req, res, next) => {
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

            console.log("RESULT IKI:", result);

            if (result.length) {
                console.log("RESULT IKI:", result);
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

};
