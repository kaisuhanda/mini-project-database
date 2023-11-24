// controllers/index.js
const eventsController = require("./events");
const categoriesController = require("./categories")
const citiesController = require("./cities")
const ticketsController = require(("./tickets"))


module.exports = {
    eventsController,
    categoriesController,
    citiesController,
    ticketsController
};


// const eventsController = require("./events")

// module.exports = {
//     eventsController
// }