const fs = require("fs");
const _ = require("lodash");

/**
 * List All Agents
 */
exports.list = (req, res) => {
  try {
      const data = fs.readFileSync("./agents/models/agents.json")
      const agents = JSON.parse(data)
      
      res.status(200).json(agents);
    } catch(err) {
      console.log(err)
      return
    }
};

/**
 * Agent Details by ID
 */
exports.getById = (req, res) => {
  try {
      const data = fs.readFileSync("./agents/models/agents.json")
      const agents = JSON.parse(data)
      let agent = _.find(agents, (a) => { return a._id == req.params.agentId })
      if (!agent) {
        return res.status(400).json({ error: 'Agent Not Found' })
      }

      res.status(200).json(agent);
    } catch(err) {
      console.log(err)
      return
    }
};

/**
 * Add New Agent
 */
exports.insert = (req, res) => {
  try {
    let agent = req.body
      const data = fs.readFileSync("./agents/models/agents.json")
      let agents = JSON.parse(data)

      // Set new Agent ID
      agent._id = getNextId(agents)

      // Add new agent to agents list
      agents.push(agent)

      // Write json
      fs.writeFile('./agents/models/agents.json', JSON.stringify(agents, null, 2), (err) => {
        if (err) console.log('Error writing file:', err)
      })

      res.sendStatus(200);
    } catch(err) {
      console.log(err)
      return
    }
};

/**
 * Update Agent by ID
 */
exports.updateById = (req, res) => {
    try {
      const data = fs.readFileSync("./agents/models/agents.json")
      let agents = JSON.parse(data)

      let agent = _.find(agents, (a) => { return a._id == req.params.agentId })
      if(agent) {
        let updatedAgent = req.body
        updatedAgent._id = agent._id
        let index = _.indexOf(agents, _.find(agents, (a) => { return a._id == req.params.agentId }))
        agents.splice(index, 1, updatedAgent)
      }

      // Write json
      fs.writeFile('./agents/models/agents.json', JSON.stringify(agents, null, 2), (err) => {
        if (err) console.log('Error writing file:', err)
      })

      res.sendStatus(200);
    } catch(err) {
      console.log(err)
      return
    }
};

const getNextId = function (list) {
  return _.orderBy(list, '_id', 'desc')[0]._id + 1
}