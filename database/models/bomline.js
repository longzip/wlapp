'use strict';
module.exports = (sequelize, DataTypes) => {
  const BomLine = sequelize.define('BomLine', {
    productId: DataTypes.NUMBER
  }, {});
  BomLine.associate = function(models) {
    // associations can be defined here
  };
  return BomLine;
};