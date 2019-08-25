'use strict';
module.exports = (sequelize, DataTypes) => {
  const Uom = sequelize.define('Uom', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  Uom.associate = function(models) {
    // associations can be defined here
  };
  return Uom;
};