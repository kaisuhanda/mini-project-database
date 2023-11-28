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

    getTicket: async (req, res, next) => {
        try {
            result = await tickets.findByPk(req.params.id)
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }
}
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

            console.log("REQ BODYY", req.body);

            if (
                type
                // price &&
                // stock &&
                // start_sales &&
                // end_sales
            ) {
                const result = await tickets.create(
                    req.body,
                    {
                        transaction: t
                    })
                // console.log("RESSULLTTICKET", result);
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

    //nanda
    createTransaction: async (req, res, next) => {
        const t = await sequelize.transaction();
        try {
            const { ticketId, quantity, paymentAmount, dateAndTime, firstName, lastName, email, phoneNumber, identityNumber, address, gender, userid } = req.body;

            // Periksa ketersediaan tiket
            const ticket = await tickets.findByPk(ticketId, { transaction: t });
            if (!ticket || ticket.stock < quantity) {
                throw new Error('Tiket tidak tersedia atau stok tidak mencukupi.');
            }

            // Kurangi stok tiket
            const newStock = ticket.stock - quantity;
            await ticket.update({ stock: newStock }, { transaction: t });

            // Simpan transaksi
            const newTransaction = await transactions.create({
                ticket_id: ticketId,
                user_id: userid,
                quantity,
                payment_amount: paymentAmount,
                date_and_time: dateAndTime,
                first_name: firstName,
                last_name: lastName,
                email,
                phone_number: phoneNumber,
                identity_number: identityNumber,
                address,
                gender,

            }, { transaction: t });

            // Commit transaksi
            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Transaksi berhasil',
                transaction: newTransaction,
            });
        } catch (error) {
            // Rollback transaksi jika terjadi kesalahan
            await t.rollback();
            console.error('Error during transaction:', error);
            return res.status(500).send({
                success: false,
                message: 'Transaksi gagal',
                error: error.message,
            });
        }
    },
    getTransactionsByUserId: async (req, res, next) => {
        try {
            // Ambil user_id dari req.params atau req.query sesuai dengan kebutuhan
            const { userId } = req.params;

            // Cek apakah userId ada
            if (!userId) {
                return res.status(400).send({
                    success: false,
                    message: 'User ID tidak valid.'
                });
            }

            // Query untuk mendapatkan data transaksi berdasarkan user_id
            const userTransactions = await transactions.findAll({
                where: { user_id: userId },
            });

            // Kirim hasil query sebagai respons
            return res.status(200).send({
                success: true,
                transactions: userTransactions,
            });
        } catch (error) {
            console.error('Error while getting user transactions:', error);
            return res.status(500).send({
                success: false,
                message: 'Gagal mengambil data transaksi.',
                error: error.message,
            });
        }
    },
}
