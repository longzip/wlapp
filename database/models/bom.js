'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bom = sequelize.define('Bom', {
    name: DataTypes.STRING
  }, {});
  Bom.associate = function(models) {
    // associations can be defined here
  };
  return Bom;
};