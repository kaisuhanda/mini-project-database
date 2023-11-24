// routers/index.js
const eventsRouter = require("./events");
const categoriesRouter = require("./categories")
const citiesRouter = require("./cities")
const ticketsRouter = require("./tickets")


module.exports = {
    eventsRouter,
    categoriesRouter,
    citiesRouter,
    ticketsRouter
};


// const eventsRouter = require("./events");

// module.exports = {
//     eventsRouter,
// };
