module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    customerName: DataTypes.STRING,
<<<<<<< HEAD
    customerDateOfBirth: DataTypes.INTEGER,
    customerTelephone: DataTypes.INTEGER
=======
    customerDOB: DataTypes.DATEONLY,
    customerNum: DataTypes.INTEGER
    // customerRenting: DataTypes.BOOLEAN
>>>>>>> 4719602173955926178bd7b040039d96ea0c8391
  });
  return customer;
};
