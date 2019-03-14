module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    customerName: DataTypes.STRING,
    customerDOB: DataTypes.DATEONLY,
    customerNum: DataTypes.INTEGER
    // customerRenting: DataTypes.BOOLEAN
  });
  return customer;
};
