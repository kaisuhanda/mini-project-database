
// controllers/index.js
// kai
const eventsController = require("./events");
const categoriesController = require("./categories")
const citiesController = require("./cities")
const ticketsController = require(("./tickets"))
// adi
const accountsControllers = require('./accounts');


module.exports = {
    // kai
    eventsController,
    categoriesController,
    citiesController,
    ticketsController,
    // adi
    accountsControllers,
};
