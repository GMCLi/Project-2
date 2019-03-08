var db = require("../models");
// var customer = require("../models");
// console.log("check" + customer);
module.exports = function(app) {
  // Get all examples
  app.get("/api/customer", function(req, res) {
    db.customer.findAll({}).then(function(customerData) {
      res.json(customerData);
    });
  });

  // Create a new example
  app.post("/api/Customer", function(req, res) {
    console.log(req.body); //console logs: { customerName: 'blah' }
    console.log(req.body.customerName); //blah
    db.customer
      .create({ customerName: req.body.customerName })
      .then(function(customerData) {
        res.json(customerData);
      });
  });

  // Delete an example by id
  app.delete("/api/customer/:id", function(req, res) {
    db.customer
      .destroy({ where: { id: req.params.id } })
      .then(function(customerData) {
        res.json(customerData);
      });
  });
};
