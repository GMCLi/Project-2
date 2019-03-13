$(document).ready(function() {
  // Get references to page elements
  var $plateNumber = $("#car-platenumber");
  var $carMake = $("#car-make");
  var $carModel = $("#car-model");
  var $carColor = $("#car-color");
  var $carYear = $("#car-year");
  var $carImage = $("#car-image");
  var $isClean = $("#is-clean");
  var $isAvailable = $("#is-available");
  var $fixCar = $("#fix-car");
  var $tankEmpty = $("#tank-empty");
  var $submitBtn = $("#submitcar");
  var $carList = $("#car-list");
  var $updateCar = $("#update-car");
  var $submitUpdate = $("#submit-update");

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
        url: "/api/cars",
        type: "GET"
      });
    },
    deleteCar: function(id) {
      return $.ajax({
        url: "/api/cars/" + id,
        type: "DELETE"
      });
    },
    updateCar: function(carUpdate, id) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "PUT",
        url: "/api/cars/" + id,
        data: JSON.stringify(carUpdate)
      });
    }
  };

  //refreshCars gets new cars from the db and repopulates the list
  var refreshCars = function() {
    API.getCars().then(function(data) {
      console.log(data);
      var $cars = data.map(function(car) {
        var $img = $("<img>").attr("src", car.image);

        $img.addClass("car-thumb");

        var $a = $("<a>")
          .text(car.platenumber)
          .attr("href", "/car/" + car.id);

        $a.addClass("mt-0 mb-1 media-body");

        var $li = $("<li>")
          .attr({
            class: "media my-4",
            "data-id": car.id
          })
          .append($img);

        $li.append($a);

        var $br = $("<br>");
        $li.append($br);

        var $p = $("<p>")
          .text(car.year + ", " + car.model)
          .attr("class", "media-body");

        $li.append($p);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right")
          .text("Delete Car");

        $li.append($button);

        return $li;
      });

      $carList.empty();
      $carList.append($cars);
    });
  };

  refreshCars();

  // handleFormSubmit is called whenever we submit a new car
  // Save the new car to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();
    alert("You want to add this car?");

    var car = {
      platenumber: $plateNumber.val().trim(),
      make: $carMake.val().trim(),
      model: $carModel.val().trim(),
      color: $carColor.val().trim(),
      year: $carYear.val().trim(),
      image: $carImage.val().trim(),
      isclean: $isClean.val(),
      isavailable: $isAvailable.val(),
      fix: $fixCar.val(),
      tankempty: $tankEmpty.val()
    };

    if (!(car.make && car.model)) {
      alert("You must enter car make and model!");
      return;
    }

    console.log(car);

    API.saveCar(car).then(function() {
      refreshCars();
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
    $tankEmpty.prop("checked", false);
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

  // handlesubmitUpdate is called whenever we submit an update for an existing car
  // Save the new car to the db and refresh the list
  var handlesubmitUpdate = function(event) {
    event.preventDefault();

    var idToUpdate = $(this)
      .parent()
      .attr("data-id");

    alert("You want to update this car?");

    var carUpdate = {
      platenumber: $plateNumber.val(),
      make: $carMake.val(),
      model: $carModel.val(),
      color: $carColor.val(),
      year: $carYear.val(),
      image: $carImage.val(),
      isclean: $isClean.val(),
      isavailable: $isAvailable.val(),
      fix: $fixCar.val(),
      tankempty: $tankEmpty.val()
    };

    console.log(carUpdate);

    API.updateCar(carUpdate, idToUpdate).then(function() {
      alert("car updated");
    });
  };

  //check if boolean values are checked
  $(".preference").each(function(e) {
    if ($(this).val() == 1) {
      $(this).attr("checked", "checked");
    }
  });

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $carList.on("click", ".delete", handleDeleteBtnClick);
  $updateCar.click(function() {
    alert("you want to manage this car?");
    $("#show-update").removeClass("hide-manage-car");
  });
  $submitUpdate.click("click", handlesubmitUpdate);
}); //end of document ready
