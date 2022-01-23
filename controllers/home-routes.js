// serve up homepage

const { Favorite } = require("../models");

const router = require("express").Router();
// const { User } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/nowplaying", async (req, res) => {
  try {
    res.render("nowplaying", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/popular", async (req, res) => {
  try {
    res.render("popular", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/toprated", async (req, res) => {
  try {
    res.render("toprated", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    res.render("upcoming", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login-form", async (req, res) => {
  try {
    res.render("login-form");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/my-movies", async (req, res) => {
  // get all favorites and try to render my-movies to see if the partial is at least functioning properly
  if (!req.session.loggedIn) {
    res.redirect("/login-form");
  } else {
    try {
      const favoriteData = await Favorite.findAll({
        where: {
          user_id: req.session.user.userId,
        },
      });
      const movies = favoriteData.map((movie) => movie.get({ plain: true }));
      movies.forEach((movie, index) => {
        movie.index = index;
      });
      console.log(movies);
      res.render("my-movies", {
        movies,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
