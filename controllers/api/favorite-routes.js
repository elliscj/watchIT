const router = require("express").Router();
const { Favorite, User, Rating } = require("../../models");

// ~~ /api/favorites ~~ //

// get all movies ~~ should this be a movie api feature?
router.get("/", async (req, res) => {
  try {
    const favoriteData = await Favorite.findAll({
      // include: [{ model: Rating }],
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all favorites for specific user //
router.get("/:id", async (req, res) => {
  try {
    const favoriteData = await Favorite.findAll({
      where: {
        user_id: req.params.id,
      },
      // include: [{ model: Rating }],
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add movie to users favorites
router.post("/add", async (req, res) => {
  const isLoggedIn = req.session.user || null;
  console.log(isLoggedIn);
  // console.log(req.session);
  if (isLoggedIn === null) {
    res.status(400).send("You must be logged in to use this feature.");
  } else {
    req.body.user_id = req.session.user.userId;
    console.log(req.body);
    const currentFavorite = await Favorite.findOne({
      where: {
        title: req.body.title,
        user_id: req.session.user.userId,
      },
    });
    console.log(currentFavorite);
    if (!currentFavorite) {
      try {
        const dbFavoriteData = await Favorite.create(req.body);
        res.status(200).json(dbFavoriteData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(403).send("Movie already saved to favorites");
    }
  }
});

// remove from favorites
router.delete("/remove", async (req, res) => {
  // const isLoggedIn = req.session.user
  try {
    await Favorite.destroy({
      where: {
        title: req.body.title,
        user_id: req.session.user.userId,
      },
    });

    // ~~~~ do not get 'removed' alert if this is not included...? (from my-movies.js)
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
    // ~~~~
  } catch (err) {
    res.status(500).json(err);
  }
});
// try {
//   const favoriteData = await Favorite.findAll({
//     where: {
//       user_id: req.session.user.userId,
//     },
//   });

//   const movies = favoriteData.map((movie) => movie.get({ plain: true }));
//   movies.forEach((movie, index) => {
//     movie.index = index;
//   });
//   console.log(movies);
//   res.render("my-movies", {
//     movies,
//     loggedIn: req.session.loggedIn,
//   });
// } catch (err) {
//   console.log(err);
//   res.status(500).json(err);
// }

module.exports = router;
