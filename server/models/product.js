"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      code: {
        // needs to be unique
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT(),
      type: DataTypes.STRING,
      listPrice: DataTypes.FLOAT,
      active: DataTypes.BOOLEAN,
      saleOk: DataTypes.BOOLEAN,
      imageUrl: DataTypes.STRING,
      purchaseOk: DataTypes.BOOLEAN
    },
    {}
  );
  Product.associate = function(models) {
    Product.belongsTo(models.ProductCategory);
  };
  return Product;
};
