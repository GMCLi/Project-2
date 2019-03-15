$(document).ready(function() {
    var $updateCar= $("#update-car");
    //handleCarEdit is called when the update-car button is pressed
    var handleCarEdit = function(event) {
      event.preventDefault();
      console.log("handleCarEdit Initiated");
  
      var $inputs = $(".updateCar");
      console.log($inputs);
      var car = {
        platenumber: $inputs[0][0].dataset.id,
        make: $inputs[0][1].value,
        model: $inputs[0][2].value,
        color: $inputs[0][3].value,
        year: $inputs[0][4].value,
        image: $inputs[0][5].value,
        isclean: $inputs[0][6].prop("checked"),
        isavailable: $inputs[0][7].prop("checked"),
        fix: $inputs[0][8].prop("checked"),
        tankfull: $inputs[0][8].prop("checked")

      };
      if (!car.platenumber) {
        alert("You must enter a Plate Number!");
        return;
      }
      console.log(car);
      $.ajax({
        method: "PUT",
        url: "/api/customer/" + customer.id,
        data: {
            platenumber: car.platenumber,
            make: car.make,
            model: car.model,
            color: car.color,
            year: car.year,
            image: car.image,
            isclean: car.isclean,
            isavailable:car.isavailable
            fix: car.fix,
            tankfull:car.tankfull
        }
      }).then(function() {
        location.reload();
      });
    };
    $updateCar.on("click", handleCarEdit);
  });
  