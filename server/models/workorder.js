"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workorder = sequelize.define(
    "Workorder",
    {
      name: DataTypes.STRING,
      productionAvailability: DataTypes.STRING,
      qtyProduced: DataTypes.INTEGER,
      qtyProducing: DataTypes.INTEGER,
      state: DataTypes.STRING,
      datePlanned_start: DataTypes.DATE,
      datePlanned_finished: DataTypes.DATE,
      dateStart: DataTypes.DATE,
      dateFinished: DataTypes.DATE,
      operationId: DataTypes.INTEGER,
      nextWorkOrderId: DataTypes.INTEGER,
      productionDate: DataTypes.DATE
    },
    {}
  );
  Workorder.associate = function(models) {
    Workorder.belongsTo(models.Workcenter);
    Workorder.belongsTo(models.Production);
    Workorder.belongsTo(models.Product);
  };
  return Workorder;
};
