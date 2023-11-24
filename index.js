require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
const cors = require("cors");
const { sequelize } = require("./config/config")

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    return res.status(200).send("<h1>TEST CONNECTION</h1>")
});

// #define ROUTER
const { eventsRouter } = require("./routers")
app.use("/events", eventsRouter);

const { categoriesRouter } = require("./routers")
app.use("/categories", categoriesRouter)


// error handling
app.use((err, req, res, next) => {
    return res.status(err.rc || 500).send(err);
})

app.listen(PORT, () => {
    console.log("ORM API RUNNING", PORT);
});