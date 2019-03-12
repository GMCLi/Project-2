module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    customerName: DataTypes.STRING,
    customerDateOfBirth: DataTypes.INTEGER,
    customerTelephone: DataTypes.INTEGER
  });
  return customer;
};
