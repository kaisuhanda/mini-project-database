const { events, tickets, Sequelize, sequelize } = require("../models");

module.exports = {
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
                        sort = [[{model: tickets}, 'price', 'ASC']]
                        break;
                    case 'price-desc':
                        sort = [[{model: tickets}, 'price', 'DESC']]
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
                    'events.image',
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
            return res.status(200).send(result);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    getEvent: async (req, res, next) => {
        try {
            const event = await events.findByPk(req.params.id)
            return res.status(200).send(event)
        } catch (error) {
            console.log(error);
            return res.status(404).send(error)
        }
    },
};
