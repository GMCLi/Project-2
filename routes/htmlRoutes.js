var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.customer.findAll({}).then(function(customerData) {
      // console.log(customerData.dataValues);
      res.render("customerdatabase", {
        msg: "Customer Database",
        customer: customerData
      });
    });
  });
  // Load create customer page
  app.get("/createcustomer", function(req, res) {
    db.customer.findAll({}).then(function() {
      // console.log(customerData.dataValues);
      res.render("createcustomer");
    });
  });

  //HOW TO LINK INDEX.JS HANDLESEARCHINPUT
  //load page for search results from searchbar
  app.get("/api/customer", function(req, res) {
    console.log(req);
    db.customer
      .findAll({
        // where: {
        //   customerName: $searchinput
        // }
      })
      .then(function(customerData) {
        console.log(customerData);
        res.render("customer", {
          msg: "Searched Customer",
          customer: customerData
        });
      });
  });

  //Load the home page with Authentication - Sasan
  app.get("/homepage", function(req, res) {
    res.render("homepage");
  });

  // Load cars page - Paskwa's changes
  app.get("/cars", function(req, res) {
    db.Car.findAll({}).then(function(dbCars) {
      res.render("cars", {
        msg: "Welcome!",
        cars: dbCars
      });
    });
  });

  // Load create car page - Paskwa's changes
  app.get("/createcar", function(req, res) {
    db.Car.findAll({}).then(function(dbCars) {
      res.render("createcar", {
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
        // console.log(customerData);
        res.render("customer", {
          customerID: customerData.dataValues.id,
          customerName: customerData.dataValues.customerName,
          customerDOB: customerData.dataValues.customerDOB,
          customerNum: customerData.dataValues.customerNum
        });
      });
  });

  // Load customer edit page
  app.get("/customer/:id/customerupdate", function(req, res) {
    db.customer
      .findAll({ where: { id: req.params.id } })
      .then(function(customerData) {
        // console.log(customerData[0].dataValues);
        res.render("customerupdate", {
          customerID: customerData[0].dataValues.id,
          customerName: customerData[0].dataValues.customerName,
          customerDOB: customerData[0].dataValues.customerDOB,
          customerNum: customerData[0].dataValues.customerNum
        });
      });
  });

  // Load car page and pass in a car by id - Paskwa's changes
  app.get("/car/:id", function(req, res) {
    db.Car.findOne({ where: { id: req.params.id } }).then(function(dbCar) {
      res.render("carpage", {
        car: dbCar
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
