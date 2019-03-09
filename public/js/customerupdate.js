$(document).ready(function() {
  var $updateBtn = $("#updatesubmit");
  var $customerNameUpdate = $("#customer-nameUpdate");
  //handleCustomerEdit is called when the update button is pressed
  var handleCustomerEdit = function (event) {
    event.preventDefault();
    console.log("anything");

    var $inputs = $('.updateForm :input');
    console.log($inputs);
    var $preID = $('.updateForm :label');
    console.log($preID);

    var values = {};
    console.log(values);
    // $inputs.each(function() {
    //     values[this.name] = $(this).val();
    // });
  };

  // var currentCustomer = $(this).parent().serializeArray();
  // console.log(currentCustomer);

  // $.ajax({
  //   method: "PUT",
  //   url: "/api/customer/" + ,
  //   data: $customerNameUpdate
  // }).then(function() {
  //   location.reload();
  // });
  $updateBtn.on("click", handleCustomerEdit);
});
