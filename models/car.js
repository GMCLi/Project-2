module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define("Car", {
    licenceplate: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    year: DataTypes.STRING,
    image: DataTypes.STRING,
    isclean: DataTypes.BOOLEAN,
    isavailable: DataTypes.BOOLEAN,
    fix: DataTypes.BOOLEAN,
    tankempty: DataTypes.BOOLEAN
  });
  return Car;
};
