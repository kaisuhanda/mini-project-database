require("dotenv").config();
const PORT = process.env.PORT || 2000;
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token")


app.use(cors());
app.use(express.json());
app.use(bearerToken());
// app.use('/public',express.static('uploads'))
app.use(express.static('uploads'));

app.get("/", (req, res) => {
    return res.status(200).send("API Running");
});


//#define ROUTER
const { accountsRouter } = require("./routers");
app.use("/account", accountsRouter);



app.listen(PORT, () => {
    console.log("API Running in port ", PORT);
});

