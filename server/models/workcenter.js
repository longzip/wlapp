"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workcenter = sequelize.define(
    "Workcenter",
    {
      name: DataTypes.STRING,
      isStarted: DataTypes.BOOLEAN,
      active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    },
    {}
  );
  Workcenter.associate = function(models) {
    // associations can be defined here
  };
  return Workcenter;
};
