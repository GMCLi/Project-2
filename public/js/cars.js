$(document).ready(function() {
  // Get references to page elements
  var $carMake = $("#car-make");
  var $carModel = $("#car-model");
  var $carColor = $("#car-color");
  var $carYear = $("#car-year");
  var $carImage = $("#car-image");
  /*var $isClean = $("#car-clean");
  var $isAvailable = $("#is-available");
  var $fixCar = $("fix-car");
  var $tankEmpty = $("#tank-empty");*/
  var $submitBtn = $("#submitcar");
  var $carList = $("#car-list");

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

  // refreshCars gets new cars from the db and repopulates the list
  var refreshCars = function() {
    API.getCars().then(function(data) {
      var $cars = data.map(function(car) {
        var $a = $("<a>")
          .text(car.make)
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

  refreshCars();

  // refreshcarCards gets new cars from the db and repopulates the list
  var refreshcarCards = function() {
    API.getCars().then(function(data) {
      var $cars = data.map(function(car) {
        // var $img = $("<img>").attr("src", car.image);

        var $a = $("<a>")
          .text(car.make)
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

  refreshcarCards();

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var car = {
      make: $carMake.val().trim(),
      model: $carModel.val().trim(),
      color: $carColor.val().trim(),
      year: $carYear.val().trim(),
      image: $carImage.val().trim()
      /* isclean: $isClean.prop("checked", false),
      isavailable: $isAvailable.prop("checked", false),
      fix: $fixCar.prop("checked", false),
      tankempty: $tankEmpty.prop("checked", false)*/
    };

    if (!(car.make && car.model)) {
      alert("You must enter car make and model!");
      return;
    }

    console.log(car);

    API.saveCar(car).then(function() {
      refreshCars();
    });

    $carMake.val("");
    $carModel.val("");
    $carColor.val("");
    $carYear.val("");
    $carImage.val("");
    /*$isClean.val("");
    $isAvailable.val("");
    $fixCar.val("");
    $tankEmpty.val("");*/
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteCar(idToDelete).then(function() {
      refreshCars();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $carList.on("click", ".delete", handleDeleteBtnClick);
}); //end of document ready
