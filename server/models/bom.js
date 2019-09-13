"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bom = sequelize.define(
    "Bom",
    {
      code: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      productQty: DataTypes.INTEGER
    },
    {}
  );
  Bom.associate = function(models) {
    Bom.hasOne(models.Product);
    Bom.hasOne(models.Uom);
  };
  return Bom;
};
