# megacorp
#### To install: npm install
#### To Run: node app.js
#### Server endpoint: http://localhost:3000/
#### Post & Put data content-type = x-www-form-urlencoded

## Routes:
### Agent List Page
  - Return List of All Agents: GET http://localhost:3000/agents
  - Add New Agent: POST http://localhost:3000/agents

### Agent Detail Page
  - Retrieve all Agent Details by Agent's ID: GET http://localhost:3000/agents/:agentId
  - Update Agent by ID: PUT http://localhost:3000/agents/:agentId

### Agent's Customer List View Page
  - List all customers associated with a given Agent's ID: GET http://localhost:3000/agents/:agentId/customers
  - Add new customer: POST http://localhost:3000/agents/:agentId/customers
  - Delete existing customer: DELETE http://localhost:3000/agents/:agentId/customers/:customerId

### Agent's Customer Detail Page
  - Return all customer data from our system: GET http://localhost:3000/agents/:agentId/customers/:customerId
  - Update customer: PUT http://localhost:3000/agents/:agentId/customers/:customerId
