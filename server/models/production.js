'use strict';
module.exports = (sequelize, DataTypes) => {
  const Production = sequelize.define('Production', {
    name: DataTypes.STRING,
    origin: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    productQty: DataTypes.INTEGER,
    productUomId: DataTypes.INTEGER,
    datePlannedStart: DataTypes.DATEONLY,
    datePlannedFinished: DataTypes.DATEONLY,
    dateStart: DataTypes.DATEONLY,
    dateFinished: DataTypes.DATEONLY,
    bomId: DataTypes.INTEGER,
    routingId: DataTypes.INTEGER,
    createId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    state: DataTypes.STRING,
    availability: DataTypes.STRING
  }, {});
  Production.associate = function(models) {
    // associations can be defined here
  };
  return Production;
};