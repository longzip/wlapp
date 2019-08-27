'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductProduce = sequelize.define('ProductProduce', {
    productionId: DataTypes.NUMBER
  }, {});
  ProductProduce.associate = function(models) {
    // associations can be defined here
  };
  return ProductProduce;
};