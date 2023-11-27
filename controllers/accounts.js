
const { accounts, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const upload = require("../helper/multer.js");
const generateUniqueReferralCode = require('../helper/referralCodeGenerator.js');  // untuk mendapat import
const transporter = require("../helper/mailer");
const nodemailer = require('nodemailer');

module.exports = {
  getData: async (req, res, next) => {
    try {
      const result = await accounts.findAll();
      return res.status(200).send(result);

    } catch (error) {
      return res.status(500).send(error.message);

    }
  },
  login: async (req, res, next) => {
    try {
      const { usernameOrEmail, password } = req.body;

      let result = await accounts.findOne({
        where: {
          username: usernameOrEmail,
        },
        raw: true,
      });

      if (!result) {
        // Coba mencari berdasarkan email jika tidak ditemukan berdasarkan username
        result = await accounts.findOne({
          where: {
            email: usernameOrEmail,
          },
          raw: true,
        });
      }

      if (!result) {
        return res.status(401).send({
          success: false,
          message: "Username atau email tidak valid.",
        });
      }

      const isValid = await bcrypt.compare(password, result.password);

      if (isValid) {
        const { id, username, email, phone, role, img } = result;

        const token = jwt.sign({ id, role }, process.env.SCRT_TKN);

        return res.status(200).send({
          success: true,
          result: {
            username,
            email,
            phone,
            token,
            role,
            img,
          },
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Kata sandi salah.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { username, email, phone, password, confirmPassword } = req.body;

      // Lanjutkan registrasi
      const isExist = await accounts.findOne({
        where: {
          username: username,
        },
      });

      if (isExist) {
        return res.status(400).send({
          success: false,
          message: 'Account sudah ada',
        });
      }

      // Hapus confirmPassword dari req.body
      delete req.body.confirmPassword;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;

      // Simpan data akun
      const newAccount = await accounts.create(req.body);

      // Generate referral code
      const referralCode = await generateUniqueReferralCode();

      // Simpan referral code di tabel ReferralCodes
      const referralCodeRecord = await sequelize.models.ReferralCodes.create({
        code: referralCode,
        account_id: newAccount.id,
      });

      // Update account_id dengan ID akun yang baru dibuat
      await newAccount.update({
        referralCodeId: referralCodeRecord.id,
      });

      // Generate token JWT
      const token = jwt.sign({ account_id: newAccount.id }, process.env.SCRT_TKN);

      // send email  registtration
      await transporter.sendMail({
        from: "admin",
        to: req.body.email,
        subject: "registration info",
        html: `<h1> hello , ${req.body.username}, your registration sucess </h1>
          <a href= "http://localhost:2066/account/login/${token}"> click Link </a>
          <a href= "http://localhost:5173/"> click Link </a>`
      })

      return res.status(200).send({
        success: true,
        message: 'Register success',
        referralCode: referralCode,
        account_id: newAccount.id,
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  keepLogin: async (req, res, next) => {
    try {
      console.log(req.token);
      // #description token
      const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
      console.log(verifyData);
      const result = await accounts.findOne({
        where: {
          id: verifyData.id
        },
        raw: true,
      });

      const { id, username, email, phone, role, updatedAt } = result;

      // Token expiration time
      const tokenExpiration = "24h";

      // Check if data has been updated since the last token issuance
      const lastTokenIssuedAt = verifyData.updatedAt || 0;

      if (updatedAt > lastTokenIssuedAt) {
        // Data has been updated, issue a new token
        const newToken = jwt.sign({ id, role, updatedAt }, process.env.SCRT_TKN, {
          expiresIn: tokenExpiration,
        });

        return res.status(200).send({
          success: true,
          result: {
            username,
            email,
            phone,
            token: newToken,
          },
        });
      } else {
        // Data hasn't been updated, return the same token
        return res.status(200).send({
          success: true,
          result: {
            username,
            email,
            phone,
            token: req.token,
          },
        });
      }
    } catch (error) {
      console.log(error);
      // Handle error appropriately
      return res.status(500).send(error.message);
    }
  },

  editPassword: async (req, res, next) => {
    try {
      const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
      console.log('Token verified:', verifyData);
      const user = await accounts.findOne({
        where: {
          id: verifyData.id,
        },
        raw: true,
      });

      // Memeriksa apakah kata sandi lama yang diberikan oleh pengguna adalah benar
      const isValid = await bcrypt.compare(req.body.oldPassword, user.password);

      if (!isValid) {
        return res.status(401).send({
          success: false,
          message: "Kata sandi lama salah",
        });
      }

      // Memeriksa apakah kata sandi baru dan konfirmasi kata sandi baru sesuai
      if (req.body.newPassword !== req.body.confirmNewPassword) {
        return res.status(400).send({
          success: false,
          message: "Kata sandi baru dan konfirmasi kata sandi baru tidak sesuai",
        });
      }

      // Menghash dan mengupdate kata sandi baru
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

      await accounts.update(
        { password: hashPassword },
        { where: { id: user.id } }
      );
      // Send email notification for password change
      await transporter.sendMail({
        from: "admin",
        to: user.email,
        subject: "Password Change Notification",
        html: `<h1>Hello, ${user.username}, Password akunmu berhasil di update.</h1>
             <p>Jika Anda tidak merasa melakukan perubahan ini, silakan hubungi dukungan kami.</p>`
      });



      return res.status(200).send({
        success: true,
        message: "Kata sandi berhasil diperbarui",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  editProfile: async (req, res, next) => {
    try {
      const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
      const user = await accounts.findOne({
        where: {
          id: verifyData.id,
        },
        raw: true,
      });
      if (verifyData.id !== user.id) {
        return res.status(403).send({
          success: false,
          message: "Anda tidak diizinkan mengedit profil pengguna lain.",
        });
      }

      // Lakukan validasi perubahan data, seperti username unik, email unik, phone unik, dll.
      // Misalnya, Anda dapat memeriksa apakah data baru unik di basis data.

      if (req.body.username) {
        const existingUser = await accounts.findOne({
          where: {
            username: req.body.username,
            id: { [Op.not]: user.id }, // Kecuali diri sendiri
          },
        });

        if (existingUser) {
          return res.status(400).send({
            success: false,
            message: "Username sudah digunakan oleh pengguna lain.",
          });
        }

        // Update data profil pengguna hanya untuk username
        await accounts.update(
          { username: req.body.username },
          {
            where: { id: user.id },
          }
        );
      }

      if (req.body.email) {
        const existingUser = await accounts.findOne({
          where: {
            email: req.body.email,
            id: { [Op.not]: user.id }, // Kecuali diri sendiri
          },
        });

        if (existingUser) {
          return res.status(400).send({
            success: false,
            message: "Email sudah digunakan oleh pengguna lain.",
          });
        }

        // Update data profil pengguna hanya untuk email
        await accounts.update(
          { email: req.body.email },
          {
            where: { id: user.id },
          }
        );
      }


      if (req.body.phone) {
        const existingUser = await accounts.findOne({
          where: {
            phone: req.body.phone,
            id: { [Op.not]: user.id }, // Kecuali diri sendiri
          },
        });

        if (existingUser) {
          return res.status(400).send({
            success: false,
            message: "Nomor telepon sudah digunakan oleh pengguna lain.",
          });
        }

        // Update data profil pengguna hanya untuk phone
        await accounts.update(
          { phone: req.body.phone },
          {
            where: { id: user.id },
          }
        );
      }
      return res.status(200).send({
        success: true,
        message: "Informasi profil berhasil diperbarui",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  editPhotoProfile: async (req, res, next) => {
    try {
      const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
      const user = await accounts.findOne({
        where: {
          id: verifyData.id,
        },
        raw: true,
      });
        // Setelah file diunggah, tambahkan kolom img jika ada
        if (req.file) {
          // Sesuaikan dengan cara Anda menyimpan foto
          await accounts.update(
            { img: req.file.filename },
            { where: { id: user.id } }
          );
         
        }

        return res.status(200).send({
          success: true,
          message: "Foto profil berhasil diperbarui",
        });
      
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      // Periksa apakah email ada di database
      const user = await accounts.findOne({
        where: { email: email },
      });

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email tidak ditemukan.",
        });
      }

      // Generate token unik untuk reset kata sandi
      const resetToken = jwt.sign({ email: email }, process.env.SCRT_TKN, {
        expiresIn: '1h', // Token berakhir dalam 1 jam
      });

      // Kirim email reset
      await transporter.sendMail({
        from: "admin",
        to: email,
        subject: "Reset Kata Sandi",
        html: `<h1>Reset Kata Sandi Anda</h1>
                   <p>Klik tautan berikut untuk mereset kata sandi Anda:</p>
                   <a href="http://localhost:5173/account/resetPassword?resetToken=${resetToken}">Reset Kata Sandi</a>`,
      });

      return res.status(200).send({
        success: true,
        message: "Petunjuk reset kata sandi dikirim ke email Anda.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  },
  resetPassword: async (req, res, next) => {

    try {
      const resetToken = req.query.resetToken;
      if (!resetToken) {
        console.log(resetToken, 'ini reset token kosong');
      } else {
        console.log(resetToken, 'ini reset token ada');
      }




      const { newPassword } = req.body;

      // Verifikasi token reset
      const decodedToken = jwt.verify(resetToken, process.env.SCRT_TKN);




      // Periksa apakah token masih valid
      if (!decodedToken || !decodedToken.email) {
        return res.status(400).send({
          success: false,
          message: "Token reset tidak valid atau sudah kedaluwarsa.",
        });
      }

      // Perbarui kata sandi pengguna di database
      const user = await accounts.findOne({
        where: { email: decodedToken.email },
      });

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Pengguna tidak ditemukan.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await user.update({
        password: hashedPassword,
      });

      return res.status(200).send({
        success: true,
        message: "Reset kata sandi berhasil.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  },
  getPhoto: async (req, res) => {
    try {
      // Ambil ID pengguna dari token
      const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
      const user = await accounts.findOne({
        where: {
          id: verifyData.id,
        },
        attributes: ['img'], // Hanya mengambil kolom 'img'
        raw: true,
      });

      if (user) {
        // Kirim URL foto profil sebagai respons
        return res.status(200).send({
          success: true,
          result: {
            img: user.img,
          },
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  },

  // createTransaction: async (req, res, next) => {
  //   const t = await sequelize.transaction();
  //   try {
  //     const { ticketId, quantity, payment, dateAndTime, firstName, lastName, email, phoneNumber, identityNumber, address, gender } = req.body;

  //     // Dapatkan detail tiket
  //     const ticketDetails = await getTicketDetails(ticketId);

  //     // Periksa ketersediaan tiket
  //     if (!ticketDetails || ticketDetails.stock < quantity) {
  //       throw new Error('Tiket tidak tersedia atau stok tidak mencukupi.');
  //     }

  //     // Kurangi stok tiket
  //    // await updateTicketStock(ticketId, quantity, t);

  //     // Simpan transaksi
  //     const newTransaction = await transactions.create({
  //       ticket_id: ticketId,
  //       quantity,
  //       payment_amount: paymentAmount,
  //       date_and_time: dateAndTime,
  //       first_name: firstName,
  //       last_name: lastName,
  //       email,
  //       phone_number: phoneNumber,
  //       identity_number: identityNumber,
  //       address,
  //       postal_code: postalCode,
  //       gender,
  //     }, { transaction: t });

  //     // Commit transaksi
  //     await t.commit();

  //     return res.status(200).send({
  //       success: true,
  //       message: 'Transaksi berhasil',
  //       transaction: newTransaction,
  //     });
  //   } catch (error) {
  //     // Rollback transaksi jika terjadi kesalahan
  //     await t.rollback();
  //     console.error('Error during transaction:', error);
  //     return res.status(500).send({
  //       success: false,
  //       message: 'Transaksi gagal',
  //       error: error.message,
  //     });
  //   }
  // },
}
