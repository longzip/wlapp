'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define('OrderLine', {
    order_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    productUomQty: DataTypes.INTEGER,
    productUom: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {});
  OrderLine.associate = function(models) {
    // associations can be defined here
  };
  return OrderLine;
};