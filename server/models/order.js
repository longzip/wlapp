"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      note: DataTypes.TEXT,
      active: DataTypes.BOOLEAN,
      dateFinished: DataTypes.DATE
    },
    {}
  );
  Order.associate = function(models) {
    Order.belongsTo(models.Contact);
  };
  return Order;
};
