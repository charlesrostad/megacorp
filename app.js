const config = require('./common/config/env.config.js');

const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Agents
const AgentsRouter = require('./agents/routes.config');
AgentsRouter.routesConfig(app);

// Customers
const CustomersRouter = require('./customers/routes.config');
CustomersRouter.routesConfig(app);

app.listen(config.port, () => {
 console.log("Server running on port " + config.port);
});