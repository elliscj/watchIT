const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const session = require("express-session");
const exphbs = require("express-handlebars");

const Movie = require("./models/movie");
const Rating = require("./models/rating");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
// app.use(routes);

// Set up sessions
// const sess = {
//   secret: "Super secret secret",
//   resave: false,
//   saveUninitialized: false,
// };

// app.use(session(sess));

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
