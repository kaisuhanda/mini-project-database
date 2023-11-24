
// routers/index.js
const eventsRouter = require("./events");
const categoriesRouter = require("./categories")
const citiesRouter = require("./cities")
const ticketsRouter = require("./tickets")
const accountsRouter = require("./accounts");


module.exports = {
    eventsRouter,
    categoriesRouter,
    citiesRouter,
    ticketsRouter,
    accountsRouter
};


// const eventsRouter = require("./events");

// module.exports = {
//     eventsRouter,
// };

