$(document).ready(function() {
  // Get references to page elements
  var $plateNumber = $("#plate-number");
  var $carMake = $("#car-make");
  var $carModel = $("#car-model");
  var $carColor = $("#car-color");
  var $carYear = $("#car-year");
  var $carImage = $("#car-image");
  var $isClean = $("#car-clean");
  var $isAvailable = $("#is-available");
  var $fixCar = $("#fix-car");
  var $tankFull = $("#tank-full");

  //buttons
  var $carsubmitBtn = $("#submitcar");
  //var $submitUpdate = $("#updatecar");
  var $carList = $("#car-list");
  var $cardelBtn = $("#car-delete");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveCar: function(car) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/cars",
        data: JSON.stringify(car)
      });
    },
    getCars: function() {
      return $.ajax({
        url: "/api/cars",
        type: "GET"
      });
    },
    deleteCar: function(id) {
      return $.ajax({
        url: "/api/cars/" + id,
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

  //refreshCars();

  // refreshCards gets new cars from the db and repopulates the list
  var refreshCards = function() {
    API.getCars().then(function(data) {
      console.log(data);
      var $cars = data.map(function(car) {
        //add div "card text-left car-card" id="car-list"

        var $carCard = $("<div>").attr({
          class: "card text-left car-card",
          id: "car-list",
          "data-id": car.id
        });

        //add image and append to $carCard
        var $img = $("<img>")
          .attr("src", car.image)
          .addClass("card-img-top")
          .attr("alt", "car image");
        $carCard.append($img);

        //add card body div and append it to $carCard

        var $cardBody = $("<div");
        $cardBody.addClass("card-body");
        $div.append($carCard);

        //add a href that points to car/id and append to $cardBody

        var $h5 = $("<h5>").attr({
          text: car.id + " " + car.platenumber,
          class: "card-title"
        });

        var $a = $("<a>").attr("href", "/car/" + car.id);

        $a.append($h5);

        $cardBody.append($a);

        //add card paragraph with make and model

        var $p = $("<p>").attr({
          class: "card-text",
          text: car.make + " " + car.model
        });

        $cardBody.append($p);

        //Add edit and delete buttons
        var $edit = $("<a>")
          .text("Edit")
          .attr("href", "/car/" + car.id);

        $edit.addClass("btn btn-warning float-right edit");

        $cardBody.append($edit);

        var $delBtn = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("Delete");

        $cardBody.append($delBtn);
        // $("#car-card").append($carCard);

        return $carCard;

        //       $li.append($button);

        //       return $li;
      });

      $carList.empty();
      $carList.append($cars);
    });
  };

  refreshCards();

  // handlecarFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handlecarFormSubmit = function(event) {
    event.preventDefault();
    alert("You want to add this car?");

    var car = {
      platenumber: $plateNumber.val().trim(),
      make: $carMake.val().trim(),
      model: $carModel.val().trim(),
      color: $carColor.val().trim(),
      year: $carYear.val().trim(),
      image: $carImage.val().trim(),
      isclean: $isClean.prop("checked"),
      isavailable: $isAvailable.prop("checked"),
      fix: $fixCar.prop("checked"),
      tankfull: $tankFull.prop("checked")
    };

    if (!(car.make && car.model)) {
      alert("You must enter car make and model!");
      return;
    }

    console.log(car);

    API.saveCar(car).then(function() {
      refreshCards();
    });

    $plateNumber.val("");
    $carMake.val("");
    $carModel.val("");
    $carColor.val("");
    $carYear.val("");
    $carImage.val("");
    $isClean.prop("checked", false);
    $isAvailable.prop("checked", false);
    $fixCar.prop("checked", false);
    $tankFull.prop("checked", false);
  };

  // handlecarDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handlecarDeleteBtnClick = function() {
    alert("you're sure you want to delete?");
    var carToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteCar(carToDelete).then(function() {
      console.log("delete successful");
      refreshCards();
    });
  };

  // Add event listeners to the submit and delete buttons
  $carsubmitBtn.on("click", handlecarFormSubmit);
  $cardelBtn.on("click", function() {
    alert("I see you want to delete this");
    var carId = $(this).attr("data-id");
    console.log("The car you want to delete is " + carId);
    handlecarDeleteBtnClick(carId);
  });
}); //end of document ready
