'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoutingWorkcenter = sequelize.define('RoutingWorkcenter', {
    name: DataTypes.STRING,
    workcenterId: DataTypes.INTEGER,
    sequence: DataTypes.INTEGER,
    routingId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    worksheet: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  RoutingWorkcenter.associate = function(models) {
    // associations can be defined here
  };
  return RoutingWorkcenter;
};