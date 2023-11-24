// index.js
require("dotenv").config();
const PORT = process.env.PORT || 2000;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send(`API RUNNING on port ${PORT}`);
});

const { eventsRouter } = require("./routers");
const { categoriesRouter } = require("./routers");
const { citiesRouter } = require("./routers");
const { ticketsRouter } = require("./routers")

app.use("/events", eventsRouter);
app.use("/categories", categoriesRouter)
app.use("/cities", citiesRouter)
app.use("/tickets", ticketsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// require("dotenv").config();
// const PORT = process.env.PORT || 2000;
// const express = require("express");
// const app = express();
// const cors = require("cors");

// app.use(cors());

// app.get('/', (req, res) => {
//     return res.status(200).send('API RUNNING ', PORT);
// });

// const { eventsRouter } = require("./controllers");
// app.use("/events", eventsRouter);

// app.listen(PORT, () => {
//     console.log(`Server running : ${PORT}`);
// });
