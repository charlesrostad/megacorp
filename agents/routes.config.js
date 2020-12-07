const AgentsController = require('./controllers/agents.controller');

exports.routesConfig = function (app) {
    // List All Agents
    app.get('/agents', [
        AgentsController.list
    ]);

    // List Agent Details by ID
    app.get('/agents/:agentId', [
        AgentsController.getById
    ]);

    // Add New Agent
    app.post('/agents', [
        AgentsController.insert
    ]);

    // Update Agent by ID
    app.put('/agents/:agentId', [
        AgentsController.updateById
    ]);
};