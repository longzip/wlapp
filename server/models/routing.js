"use strict";
module.exports = (sequelize, DataTypes) => {
  const Routing = sequelize.define(
    "Routing",
    {
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      code: DataTypes.STRING,
      note: DataTypes.TEXT
    },
    {}
  );
  Routing.associate = function(models) {
    // associations can be defined here
  };
  return Routing;
};
