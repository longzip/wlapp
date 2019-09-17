"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkcenterProductivity = sequelize.define(
    "WorkcenterProductivity",
    {
      qtyProduced: DataTypes.INTEGER
    },
    {}
  );
  WorkcenterProductivity.associate = function(models) {
    WorkcenterProductivity.belongsTo(models.Workcenter);
    WorkcenterProductivity.belongsTo(models.Workorder);
    WorkcenterProductivity.belongsTo(models.User);
  };
  return WorkcenterProductivity;
};
