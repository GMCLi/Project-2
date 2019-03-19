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

  //buttons - create /delete
  var $carsubmitBtn = $("#submitcar"); //createCar
  var $cardelBtn = $(".car-delete"); //deleteCar
  var $carList = $("#car-list"); //identify Div to append carCard

  //buttons - update
  var $updateCar = $("#update-car");
  var $showcarInfo = $("#show-carinfo"); //show carInfo in order to edit
  //handleCarEdit is called when the update-car button is pressed

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
      }).then(function() {
        location.reload();
      });
    },
    updateCar: function(car) {
      // console.log("this is the updateCar function");
      // console.log(car);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "PUT",
        url: "/api/cars/" + car.id,
        data: JSON.stringify(car)
      }).then(function() {
        console.log("The car information is now updated");
      });
    }
  };

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
          .addClass("card-img-top car-thumb")
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
    // alert("You want to add this car?");- used for testing only

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

  //handleUpdateCar
  // handlecarFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleUpdateCar = function(event) {
    event.preventDefault();

    console.log("Car update initiated");
    var $inputs = $(".updateCar");
    // console.log($inputs);

    var car = {
      id: $inputs[0][0].dataset.id,
      platenumber: $inputs[0][1].value,
      make: $inputs[0][2].value,
      model: $inputs[0][3].value,
      color: $inputs[0][4].value,
      year: $inputs[0][5].value,
      image: $inputs[0][6].value,
      isclean: $inputs[0][7].checked,
      isavailable: $inputs[0][8].checked,
      fix: $inputs[0][9].checked,
      tankfull: $inputs[0][10].checked
    };

    if (!(car.make && car.model)) {
      alert("You must enter car make and model!");
      return;
    }

    // console.log(car);

    API.updateCar(car).then(function() {
      // refreshCards();
    });
  };

  //end of handleUpdateCar
  // handlecarDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handlecarDeleteBtn = function(id) {
    alert("Are you sure you want to delete this car?");
    // var carToDelete = id
    //   .parent()
    //   .attr("data-id");

    API.deleteCar(id).then(function() {
      console.log("delete successful");
      refreshCards();
    });
  };

  // Add event listeners to the submit and delete buttons
  $carsubmitBtn.on("click", handlecarFormSubmit);
  $cardelBtn.on("click", function() {
    // alert("I see you want to delete this"); - for testing only
    var carId = $(this).attr("data-id");
    console.log("The car you want to delete is " + carId);
    handlecarDeleteBtn(carId);
  });
  $showcarInfo.on("click", function() {
    $("#car-details").removeClass("hide-carinfo");
  });
  $updateCar.on("click", handleUpdateCar);
}); //end of document ready
