var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {
  // Get all customers
  app.get("/api/customer", function(req, res) {
    db.customer.findAll({}).then(function(customerData) {
      res.json(customerData);
    });
  });

  // Search bar get all things with the search term
  app.get("/search", (req, res) => {
    var { term } = req.query;

    db.customer.findAll({ where: { [Op.like]: "%" + term + "%"}})
      .then(Data => res.render('data', { Data }))
      .catch(err => console.log(err));
  })

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

  // Delete an example by id
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

    // PUT route for updating car info by id - Paskwa's changes
    app.put("/api/car/:id", function(req, res) {
      console.log(req.body);
      db.car
        .update(
          {
            platenumber: req.body.platenumber,
            make: req.body.name,
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            image: req.body.image,
            isclean: req.body.isclean,
            isavailable: req.body.isavailable,
            fix: req.body.fix,
            tankFull: red.body.tankfull
          },
          {
            where: {
              id: req.params.id //confirmed operational
            }
          }
        )
        .then(function(carData) {
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
