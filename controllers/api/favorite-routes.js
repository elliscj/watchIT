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
  if (!req.session.user.userId) {
    alert("You must sign in to use this feature!");
  } else {
    req.body.user_id = req.session.user.userId;
    console.log(req.body);
    try {
      const dbFavoriteData = await Favorite.create(req.body);
      res.status(200).json(dbFavoriteData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
