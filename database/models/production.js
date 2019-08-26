'use strict';
module.exports = (sequelize, DataTypes) => {
  const Production = sequelize.define('Production', {
    name: DataTypes.STRING
  }, {});
  Production.associate = function(models) {
    // associations can be defined here
  };
  return Production;
};