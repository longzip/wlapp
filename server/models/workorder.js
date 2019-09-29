"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workorder = sequelize.define(
    "Workorder",
    {
      nextWorkOrderId: DataTypes.INTEGER
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
