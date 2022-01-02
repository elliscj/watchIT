const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // run_time: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // release_year: {
    //   type: DataTypes.INTEGER,
    // },
    trailer_url: {
      type: DataTypes.STRING(10000),
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
    modelName: "favorites",
  }
);

module.exports = Favorite;