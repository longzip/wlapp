'use strict';
module.exports = (sequelize, DataTypes) => {
  const UomCategory = sequelize.define('UomCategory', {
    name: DataTypes.STRING,
    measure_type: DataTypes.STRING
  }, {});
  UomCategory.associate = function(models) {
    // associations can be defined here
  };
  return UomCategory;
};