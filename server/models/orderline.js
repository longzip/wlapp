'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    productUomQty: DataTypes.INTEGER,
    productUom: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};