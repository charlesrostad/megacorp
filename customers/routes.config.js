const CustomersController = require('./controllers/customers.controller');

exports.routesConfig = function (app) {
    // List all customers associated with specified Agent ID
    app.get('/agents/:agentId/customers', [
        CustomersController.list
    ]);

    // List Customer Details by ID
    app.get('/agents/:agentId/customers/:customerId', [
        CustomersController.getById
    ]);

    // Add New Customer
    app.post('/agents/:agentId/customers', [
        CustomersController.insert
    ]);

    // Update Customer by ID
    app.put('/agents/:agentId/customers/:customerId', [
        CustomersController.updateById
    ]);

    // Delete Customer by ID
    app.delete('/agents/:agentId/customers/:customerId', [
        CustomersController.removeById
    ]);
};