const fs = require("fs");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

/**
 * List all customers associated with specified Agent ID
 */
exports.list = (req, res) => {
    try {
        const data = fs.readFileSync("./customers/models/customers.json")
        const customers = JSON.parse(data)

        // Get all customers for agent
        let customersByAgent = _.filter(customers, (c) => { return c.agent_id == req.params.agentId })
        let customersByAgentFormatted = []

        _.forEach(customersByAgent, (c) => {
          // Split address string to extrapolate city & state fields
          let addressArr = c.address.split(',')

          let customer = {
            name: c.name.last + ', ' + c.name.first,
            city: addressArr[addressArr.length - 3],
            state: addressArr[addressArr.length - 2]
          }
          customersByAgentFormatted.push(customer)
        })

        res.status(200).json(customersByAgentFormatted);
      } catch(err) {
        console.log(err)
        return
      }
  };

/**
 * Return all data for specific Customer ID
 */
exports.getById = (req, res) => {
  try {
      const data = fs.readFileSync("./customers/models/customers.json")
      const customers = JSON.parse(data)

      let customer = _.find(customers, (c) => { return c._id == req.params.customerId })

      res.status(200).json(customer);
    } catch(err) {
      console.log(err)
      return
    }
};

/**
 * Add New Customer
 */
exports.insert = (req, res) => {
  try {
      let customer = req.body

      const data = fs.readFileSync("./customers/models/customers.json")
      let customers = JSON.parse(data)

      // Set new customer IDs
      customer._id = getNextId(customers)
      customer.guid = uuidv4(); // generate guid
      
      customers.push(customer)

      // Write json
      fs.writeFile('./customers/models/customers.json', JSON.stringify(customers, null, 2), (err) => {
        if (err) console.log('Error writing file:', err)
      })
      
      res.sendStatus(200);
    } catch(err) {
      console.log(err)
      return
    }
};


/**
 * Update Customer by ID
 */
exports.updateById = (req, res) => {
  try {
    const data = fs.readFileSync("./customers/models/customers.json")
    let customers = JSON.parse(data)

    let customer = _.find(customers, (a) => { return a._id == req.params.customerId })
    if(customer) {
      let updatedCustomer = req.body
      updatedCustomer._id = customer._id
      let index = _.indexOf(customers, _.find(customers, (a) => { return a._id == req.params.customerId }))
      agents.splice(index, 1, updatedCustomer)
    }

    // Write json
    fs.writeFile('./customers/models/customers.json', JSON.stringify(customers, null, 2), (err) => {
      if (err) console.log('Error writing file:', err)
    })
    res.sendStatus(200);
  } catch(err) {
    console.log(err)
    return
  }
};

/**
 * Delete Customer by ID
 */
exports.removeById = (req, res) => {
  try {
      const data = fs.readFileSync("./customers/models/customers.json")
      let customers = JSON.parse(data)

      // remove customer from customers array
      customers = _.filter(customers, (c) => { return c._id != req.params.customerId })

      // Write json
      fs.writeFile('./customers/models/customers.json', JSON.stringify(customers, null, 2), (err) => {
        if (err) console.log('Error writing file:', err)
      })

      res.send('Customer Deleted');
    } catch(err) {
      console.log(err)
      return
    }
};

const getNextId = function (list) {
  return _.orderBy(list, '_id', 'desc')[0]._id + 1
}