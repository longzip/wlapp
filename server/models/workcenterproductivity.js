'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkcenterProductivity = sequelize.define('WorkcenterProductivity', {
    workcenterId: DataTypes.INTEGER,
    workorderId: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    qtyProduced: DataTypes.INTEGER,
    loss_id: DataTypes.INTEGER,
    loss_type: DataTypes.STRING,
    description: DataTypes.TEXT,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    duration: DataTypes.DOUBLE
  }, {});
  WorkcenterProductivity.associate = function(models) {
    // associations can be defined here
  };
  return WorkcenterProductivity;
};