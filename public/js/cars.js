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
  var $tankEmpty = $("#tank-empty");
  var $submitBtn = $("#submitcar");
  //var $submitUpdate = $("#updatecar");
  var $carList = $("#car-list");

  //check if checkbox is checked
  // $(".check-ifchecked").each(function(e) {
  //   if ($(this).val() == 1) {
  //     $(this).attr("checked", "checked");
  //   }
  // });

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
      var $cars = data.map(function(car) {
        //add div div class="col-lg-4 col-sm-6 car-card"

        var $carCard = $("<div>").attr({
          class: "col-lg-4 col-sm-6 car-card",
          "data-id": car.id
        });

        //add div div class="card and append to $carCard

        var $div = $("<div").addClass("card");
        $carCard.append($div);

        //add image and append to $div
        var $img = $("<img>")
          .attr("src", car.image)
          .addClass("card-img-top");
        $div.append($img);

        //add card body div and append it to $div

        var $cardDiv = $("<div");
        $cardDiv.addClass("card-body text-left");
        $div.append($cardDiv);

        //add a href that points to car/id and append to $div
        var $a = $("<a>")
          .text(car.platenumber)
          .attr("href", "/car/" + car.id);
        $a.addClass("card-title");

        $cardDiv.append($a);

        //add card paragraph with make and model

        var $p = $("<p>").attr({
          class: "card-text",
          text: car.make + " " + car.model
        });

        $cardDiv.append($p);

        //Add edit and delete buttons
        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("Delete");

        $cardDiv.append($button);
        // $("#car-card").append($carCard);

        return $carCard;

        //       $li.append($button);

        //       return $li;
      });

      $carList.empty();
      $carList.append($cars);
    });
  };

  //refreshCards();

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
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
    $isClean.prop("checked", 0);
    $isAvailable.prop("checked", 0);
    $fixCar.prop("checked", 0);
    $tankEmpty.prop("checked", 0);
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