'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bom = sequelize.define('Bom', {
    code: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    productId: DataTypes.INTEGER,
    productQty: DataTypes.INTEGER,
    productUomId: DataTypes.INTEGER,
    sequence: DataTypes.INTEGER,
    routingId: DataTypes.INTEGER
  }, {});
  Bom.associate = function(models) {
    // associations can be defined here
  };
  return Bom;
};