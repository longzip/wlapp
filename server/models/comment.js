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
    Comment.belongsTo(models.User);
  };
  return Comment;
};
