// Get references to page elements
var $carModel = $("#car-model");
var $carColor = $("#car-color");
var $carYear = $("#car-year");
var $carImage = $("#car-image");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveCar: function(car) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/cars",
      data: JSON.stringify(car)
    });
  },
  getCars: function() {
    return $.ajax({
      url: "api/cars",
      type: "GET"
    });
  },
  deleteCar: function(id) {
    return $.ajax({
      url: "api/cars/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshCars = function() {
  API.getCars().then(function(data) {
    var $cars = data.map(function(car) {
      var $a = $("<a>")
        .model(car.model)
        .attr("href", "/car/" + car.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": car.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $carList.empty();
    $carList.append($cars);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var car = {
    carmodel: $carModel.val().trim(),
    carcolor: $carColor.val().trim(),
    caryear: $carYear.val().trim(),
    carimage: $carImage.val().trim(),
  };

  if (!(car.carmodel && car.carcolor)) {
    alert("You must enter a car model and color!");
    return;
  }

  API.saveCar(car).then(function() {
    refreshCars();
  });

  $carModel.val("");
  $carColor.val("");
  $carYear.val("");
  $carImage.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
