$(document).ready(function() {
  var $updateBtn = $("#updatesubmit");
  //handleCustomerEdit is called when the update button is pressed
  var handleCustomerEdit = function(event) {
    event.preventDefault();
    console.log("handleCustomerEdit Initiated");

    var $inputs = $(".updateForm");

    var customer = {
      id: $inputs[0][0].dataset.id,
      name: $inputs[0][1].value
    };
    console.log(customer.name);
    $.ajax({
      method: "PUT",
      url: "/api/customer/" + customer.id,
      data: {
        name: customer.name
      }
    }).then(function() {
      location.reload();
    });
  };
  $updateBtn.on("click", handleCustomerEdit);
});
