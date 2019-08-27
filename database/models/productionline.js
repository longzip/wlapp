'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductionLine = sequelize.define('ProductionLine', {
    productProduceId: DataTypes.NUMBER
  }, {});
  ProductionLine.associate = function(models) {
    // associations can be defined here
  };
  return ProductionLine;
};