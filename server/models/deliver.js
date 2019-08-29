'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deliver = sequelize.define('Deliver', {
    name: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productQty: DataTypes.INTEGER
  }, {});
  Deliver.associate = function(models) {
    // associations can be defined here
  };
  return Deliver;
};