"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workorder = sequelize.define(
    "Workorder",
    {
      nextWorkOrderId: DataTypes.INTEGER,
      productUom: DataTypes.STRING,
      factor: DataTypes.INTEGER,
      isStarted: DataTypes.BOOLEAN
    },
    {}
  );
  Workorder.associate = function(models) {
    Workorder.belongsTo(models.Workcenter);
    Workorder.belongsTo(models.Production);
    Workorder.belongsTo(models.Product);
    Workorder.belongsTo(models.Contact);
    Workorder.hasMany(models.WorkcenterProductivity);
  };
  return Workorder;
};
