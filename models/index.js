const User = require("./User");
const Rating = require("./Rating");
const Movie = require("./Movie");

User.hasMany(Rating, {
  foreignKey: "user_id",
});

// Movie.belongsToMany(User, {
//   foreignKey: "movie_id",
// });

Movie.hasMany(Rating, {
  foreignKey: "movie_id",
});

Rating.belongsTo(Movie, {
  foreignKey: "movie_id",
});

Rating.belongsTo(User, {
  foreignKey: "user_id",
});

// User.hasMany(Movie, {
//     foreignKey: "movie_ids"
// })

module.exports = { User, Rating, Movie };

// hooks: {
//       beforeCreate: async (newUserData) => {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//       beforeUpdate: async (updatedUserData) => {
//         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//         return updatedUserData;
//       },
//     },

// ~~~~ CUSTOM HELPER TO VALIDATE EMAIL AND USERNAME UNIQUE ~~~~
// module.exports = {
//   format_time: (date) => {
//     return date.toLocaleTimeString();
//   },
//   format_date: (date) => {
//     return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
//       new Date(date).getFullYear() + 5
//     }`;
//   },
// };
