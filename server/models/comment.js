"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      commentary: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );
  Comment.associate = function(models) {
    Comment.hasOne(models.User);
  };
  return Comment;
};
