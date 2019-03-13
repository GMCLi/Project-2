$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?car.id=2)
  var url = window.location.search;
  var carId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the car id from the url
  // In localhost:8080/cms?car.id=1, carId is 1
  if (url.indexOf("?car.id=") !== -1) {
    carId = url.split("=")[1];
    getCarData(carId);
  }

  // Getting jQuery references to the platenumber, carmake,model, color, year, isclean, is available, fixcar, tankempty,
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
  //var $submitBtn = $("#submitcar");
  //var $updateForm = $("update-form");

  // Adding an event listener for when the form is submitted
  $(updateForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a platenumber or a make
    if (!$plateNumber.val().trim() || !$carMake.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newCar = {
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

    console.log(newCar);

    // If we're updating a post run updateCar to update a car
    // Otherwise run submitCar to create a whole new car
    if (updating) {
      newCar.id = carId;
      updateCar(newCar);
    } else {
      submitCar(newCar);
    }
  });

  // Submits a new car and brings user to cars page upon completion
  function submitCar(Car) {
    $.post("/api/cars/", Car, function() {
      window.location.href = "/cars";
    });
  }

  // Gets car data for a car if we're editing
  function getCarData(id) {
    $.get("/api/cars/" + id, function(data) {
      if (data) {
        // If this car exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        postCategorySelect.val(data.category);
        make.val(data.make);
        model.val(data.model);
        color.val(data.color);
        year.val(data.year);
        image.val(data.image);
        isclean.val(data.isclean);
        isavailable.val(isavailable);
        fix.val(data.fix);
        tankempty.val(data.tankempty);
        // If we have a car with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given car, bring user to the blog page when done
  function updateCar(car) {
    $.ajax({
      method: "PUT",
      url: "/api/cars",
      data: car
    }).then(function() {
      window.location.href = "/cars";
    });
  }
});
