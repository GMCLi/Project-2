var customer = require("../models/example.js");

module.exports = function(app) {
  // Get all examples
  app.get("/api/customer", function(req, res) {
    customer.findAll({}).then(function(customerData) {
      res.json(customerData);
    });
  });

  // Get all cars
  app.get("/api/cars", function(req, res) {
    db.Car.findAll({}).then(function(dbCars) {
      res.json(dbCars);
    });
  });

  // Create a new example
  app.post("/api/newCustomer", function(req, res) {
    console.log(req.body);
    customer
      .create({ customerName: req.body.customerName })
      .then(function(customerData) {
        res.json(customerData);
      });
  });

  // Create a new car
  app.post("/api/newCar", function(req, res) {
    console.log(req.body);
    Car.create({ carModel: req.body.carModel }).then(function(carData) {
      res.json(carData);
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

  // Delete a car by id
  app.delete("/api/cars/:id", function(req, res) {
    db.Car.destroy({ where: { id: req.params.id } }).then(function(dbCar) {
      res.json(dbCar);
    });
  });
};
