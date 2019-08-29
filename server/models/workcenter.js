'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workcenter = sequelize.define('Workcenter', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    code: DataTypes.STRING,
    note: DataTypes.TEXT
  }, {});
  Workcenter.associate = function(models) {
    // associations can be defined here
  };
  return Workcenter;
};