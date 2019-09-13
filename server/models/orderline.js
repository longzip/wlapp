'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define('OrderLine', {
    name: DataTypes.STRING,
    productUomQty: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {});
  OrderLine.associate = function(models) {
    OrderLine.belongsTo(models.Order);
    OrderLine.belongsTo(models.Product);
    OrderLine.belongsTo(models.Uom);
  };
  return OrderLine;
};