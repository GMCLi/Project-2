$(document).ready(function() {
  var $updateBtn = $("#updatesubmit");
  //handleCustomerEdit is called when the update button is pressed
  var handleCustomerEdit = function(event) {
    event.preventDefault();
    console.log("handleCustomerEdit Initiated");

    var $inputs = $(".updateForm");
    console.log($inputs);
    var customer = {
      id: $inputs[0][0].dataset.id,
      name: $inputs[0][1].value,
      DOB: $inputs[0][2].value,
      num: $inputs[0][3].value
    };
    if (!customer.name) {
      alert("You must enter a name!");
      return;
    }
    console.log(customer);
    $.ajax({
      method: "PUT",
      url: "/api/customer/" + customer.id,
      data: {
        name: customer.name,
        DOB: customer.DOB,
        num: customer.num
      }
    }).then(function() {
      location.reload();
    });
  };
  $updateBtn.on("click", handleCustomerEdit);
});
