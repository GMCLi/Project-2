var customer = require("../models/example.js");

module.exports = function(app) {
  // Get all examples
  app.get("/api/customer", function(req, res) {
    customer.findAll({}).then(function(customerData) {
      res.json(customerData);
    });
  });

  // Create a new example
  app.post("/api/customer", function(req, res) {
    customer.create(req.body).then(function(customerData) {
      res.json(customerData);
    });
  });

  // Delete an example by id
  app.delete("/api/customer/:id", function(req, res) {
    customer
      .destroy({ where: { id: req.params.id } })
      .then(function(customerData) {
        res.json(customerData);
      });
  });
};
