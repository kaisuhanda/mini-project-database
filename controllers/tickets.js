const { tickets ,sequelize, transactions } = require("../models")
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


    //nanda
    createTransaction: async (req, res, next) => {
        const t = await sequelize.transaction();
        try {
            const { ticketId, quantity, paymentAmount, dateAndTime, firstName, lastName, email, phoneNumber, identityNumber, address, gender,userid } = req.body;

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
