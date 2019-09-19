"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bom = sequelize.define(
    "Bom",
    {
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      productQty: DataTypes.INTEGER
    },
    {}
  );
  Bom.associate = function(models) {
    Bom.belongsTo(models.Product);
    Bom.hasMany(models.BomLine);
    Bom.belongsTo(models.Routing);
  };
  return Bom;
};
