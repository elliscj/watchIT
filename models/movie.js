const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Movie extends Model {}

Movie.init(
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
    run_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_year: {
      type: DataTypes.INTEGER,
    },
    trailer_url: {
      type: DataTypes.STRING(10000),
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "movies",
  }
);

module.exports = Movie;
