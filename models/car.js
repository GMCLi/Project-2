module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define("Car", {
    carmodel: DataTypes.STRING,
    carcolor: DataTypes.STRING,
    caryear: DataTypes.STRING,
    carimage: DataTypes.STRING
  });
  return Car;
};
