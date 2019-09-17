"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      addressLine: DataTypes.STRING,
      city: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      state: DataTypes.STRING,
      note: DataTypes.TEXT
    },
    {}
  );
  Contact.associate = function(models) {
<<<<<<< HEAD
    Contact.hasOne(models.User);
    Contact.hasMany(models.Order)
=======
    Contact.belongsTo(models.User);
    Contact.hasMany(models.Order);
>>>>>>> b8f90c3785f251dc0652b3c24d4df10f9e09202f
  };
  return Contact;
};
