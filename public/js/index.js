// Get references to page elements
var $customerName = $("#customer-name");
var $submitBtn = $("#submit");
var $DOBsubmit = $("#customerDOB");
// var $customerRenting = $("#customerRenting");
var $customerNum = $("#customerNum");
var $exampleList = $("#example-list");

// var $customerNameUpdate = $("#customer-nameUpdate");

// The API object contains methods for each kind of request we'll make
var API = {
  saveCustomer: function(customerData) {
    console.log("API.saveCustomer running"); //not called so api.saveCustomer not running
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/customer",
      data: JSON.stringify(customerData)
    }).then(function() {
      // location.reload();
    });
  },

  getExamples: function() {
    return $.ajax({
      url: "api/customer",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/customer/" + id,
      type: "DELETE"
    }).then(function() {
      location.reload();
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  console.log("handleFormSubmit running"); //not running so handleFormSubmit not running
  event.preventDefault();

  var customer = {
    customerName: $customerName.val().trim(),
    customerDOB: $DOBsubmit.val(),
    customerNum: $customerNum.val()
    // customerRenting: $customerRenting.val()
  };

  // if (
  //   !(customer.customerName && customer.customerDOB && customer.customerNum)
  // ) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }
  API.saveCustomer(customer).then(function() {
    refreshExamples();
    Location.reload();
  });

  $customerName.val("");
  $customerDOB.val("");
  $customerNum.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit, console.log("submit clicked"));
$exampleList.on("click", ".delete", handleDeleteBtnClick);
