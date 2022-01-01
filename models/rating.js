const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorite_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "favorites",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "ratings",
  }
);

module.exports = Rating;
