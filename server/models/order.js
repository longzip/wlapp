'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    note: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    dateFinished: DataTypes.DATE,
    contactId: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};