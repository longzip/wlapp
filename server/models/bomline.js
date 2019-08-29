'use strict';
module.exports = (sequelize, DataTypes) => {
  const BomLine = sequelize.define('BomLine', {
    productId: DataTypes.INTEGER,
    productQty: DataTypes.INTEGER,
    productUomId: DataTypes.INTEGER,
    sequence: DataTypes.INTEGER,
    routingId: DataTypes.INTEGER,
    bomId: DataTypes.INTEGER,
    operationId: DataTypes.INTEGER
  }, {});
  BomLine.associate = function(models) {
    // associations can be defined here
  };
  return BomLine;
};