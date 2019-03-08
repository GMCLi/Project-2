var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.customer.findAll({}).then(function(customerData) {
      res.render("index", {
        msg: "function findAll - All Customers",
        examples: customerData
      });
    });
  });

  // Load cars page
  app.get("/cars", function(req, res) {
    db.Car.findAll({}).then(function(dbCars) {
      res.render("cars", {
        msg: "Welcome!",
        cars: dbCars
      });
    });
  });

  // Load customer page and pass in an customer by id
  app.get("/customer/:id", function(req, res) {
    db.customer
      .findOne({ where: { id: req.params.id } })
      .then(function(customerData) {
        res.render("example", {
          examples: customerData
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
