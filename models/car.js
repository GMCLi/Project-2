module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define("Car", {
    platenumber: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    year: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true, // checks for url format (http://foo.com)
        len: [3, 1000] // only allow values with length between 5 and 500
      }
    },
    isclean: DataTypes.BOOLEAN,
    isavailable: DataTypes.BOOLEAN,
    fix: DataTypes.BOOLEAN,
    tankfull: DataTypes.BOOLEAN
  });
  return Car;
};
