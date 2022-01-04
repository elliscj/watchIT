const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up sessions
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// const path = require("path");
// const express = require("express");
// const sequelize = require("./config/connection");
// const session = require("express-session");
// const exphbs = require("express-handlebars");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// // Set up sessions
// const sess = {
//   secret: "Super secret secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// app.use(require("./controllers/"));

// const hbs = exphbs.create({});

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });

// // const path = require("path");
// // const express = require("express");
// // const routes = require("./controllers");
// // const sequelize = require("./config/connection");
// // const session = require("express-session");
// // const exphbs = require("express-handlebars");
// // const SequelizeStore = require("connect-session-sequelize")(session.Store);

// // const Favorite = require("./models/favorite");
// // const User = require("./models/user");
// // const Rating = require("./models/rating");

// // const app = express();
// // const PORT = process.env.PORT || 3001;

// // // app.engine("handlebars", hbs.engine);
// // app.set("view engine", "handlebars");
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.static(path.join(__dirname, "public")));
// // app.set("views", __dirname / "views");

// // // turn on routes
// // app.use(routes);

// // // Set up sessions
// // const sess = {
// //   secret: "Super secret secret",
// //   cookie: {},
// //   resave: false,
// //   saveUninitialized: true,
// //   store: new SequelizeStore({
// //     db: sequelize,
// //   }),
// // };

// // // app.use(session(sess));

// // // app.engine("handlebars", hbs.engine);
// // app.set("view engine", "handlebars");

// // // turn on connection to db and server
// // sequelize.sync({ force: true }).then(() => {
// //   app.listen(PORT, () => console.log("Now listening"));
// // });
