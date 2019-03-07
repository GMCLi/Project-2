module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    customerName: DataTypes.STRING
  });
  return customer;
};
