module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define("Car", {
    platenumber: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    year: DataTypes.STRING,
    image: DataTypes.STRING,
    isclean: DataTypes.BOOLEAN,
    isavailable: DataTypes.BOOLEAN,
    fix: DataTypes.BOOLEAN,
<<<<<<< HEAD
    tankfull: DataTypes.BOOLEAN
=======
    tankempty: DataTypes.BOOLEAN
>>>>>>> 12b36c88d6405d25515907e432cf1efce148f966
  });
  return Car;
};
