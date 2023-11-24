const nodemailer =require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"farhanrizal737@gmail.com",
        pass:"tpbpatisfgqlbexz",
    },
});

module.exports = transporter;
