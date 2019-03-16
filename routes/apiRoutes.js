var db = require("../models");

module.exports = function(app) {
  // Get all customers
  app.get("/api/customer", function(req, res) {
    db.customer.findAll({}).then(function(customerData) {
      res.json(customerData);
    });
  });

  // Search bar get all things with the search term
  app.get("/api/customer/:Name", function(req, res) {
    console.log(req.params);
    db.customer
      .findAll({
        where: {
          customerName: req.params.Name
        }
      })
      .then(function(customerData) {
        console.log("customerData comes as...CustomerData???" + customerData);
        res.json(customerData);
      });
  });

  // Get all cars - Paskwa's changes
  app.get("/api/cars", function(req, res) {
    db.Car.findAll({}).then(function(dbCars) {
      res.json(dbCars);
    });
  });

  // Create a new customer
  app.post("/api/customer", function(req, res) {
    console.log("name: " + req.body.customerName); //not called so app.post is not called
    console.log(req.body);
    db.customer
      .create({
        customerName: req.body.customerName,
        customerDOB: req.body.customerDOB,
        customerNum: req.body.customerNum
        // customerRenting: req.body
      })
      .then(function(customerData) {
        res.json(customerData);
      });
  });

  // Create a new car - Paskwa's changes
  app.post("/api/cars", function(req, res) {
    db.Car.create(req.body).then(function(dbCar) {
      res.json(dbCar);
      console.log("testing api routes");
    });
  });

  // Delete an customer by id
  app.delete("/api/customer/:id", function(req, res) {
    db.customer
      .destroy({ where: { id: req.params.id } })
      .then(function(customerData) {
        res.json(customerData);
      });
  });

  // PUT route for updating customer info by id
  app.put("/api/customer/:id", function(req, res) {
    console.log(req.body);
    db.customer
      .update(
        {
          customerName: req.body.name,
          customerDOB: req.body.DOB,
          customerNum: req.body.num
        },
        {
          where: {
            id: req.params.id //confirmed operational
          }
        }
      )
      .then(function(customerData) {
        res.json(customerData);
      });
  });

  // PUT route for updating car info by id - Paskwa
  app.put("/api/cars/:id", function(req, res) {
    console.log(req.body);
    db.Car.update(
      {
        platenumber: req.body.platenumber,
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        image: req.body.image,
        isclean: req.body.isclean,
        isavailable: req.body.isavailable,
        fix: req.body.fix,
        tankfull: req.body.tankfull
      },
      {
        where: {
          id: req.params.id //confirmed operational
        }
      }
    ).then(function(carData) {
      res.json(carData);
    });
  });

  // Delete a car by id - Paskwa's changes
  app.delete("/api/cars/:id", function(req, res) {
    db.Car.destroy({ where: { id: req.params.id } }).then(function(dbCar) {
      res.json(dbCar);
    });
  });
};
