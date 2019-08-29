'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    name: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    productionId: DataTypes.INTEGER,
    workorderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productQty: DataTypes.INTEGER
  }, {});
  Inventory.associate = function(models) {
    // associations can be defined here
  };
  return Inventory;
};