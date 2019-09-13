'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    addressLine: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    note: DataTypes.TEXT('tiny')
  }, {});
  Contact.associate = function(models) {
    Contact.hasOne(models.User);
    Contact.hasMany(models.Order)
  };
  return Contact;
};