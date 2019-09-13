"use strict";
module.exports = (sequelize, DataTypes) => {
  const BomLine = sequelize.define(
    "BomLine",
    {
      productQty: DataTypes.INTEGER,
      productUomId: DataTypes.INTEGER,
      operationId: DataTypes.INTEGER
    },
    {}
  );
  BomLine.associate = function(models) {
    BomLine.hasOne(models.Bom);
    BomLine.hasOne(models.Routing);
    BomLine.hasOne(models.Product);
    BomLine.hasOne(models.Uom);
  };
  return BomLine;
};
