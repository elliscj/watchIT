const router = require("express").Router();
const { Favorite, User, Rating } = require("../../models");

// ~~ /api/favorites ~~ //

// get all movies ~~ should this be a movie api feature?
router.get("/", async (req, res) => {
  try {
    const favoriteData = await Favorite.findAll({
      include: [{ model: Rating }],
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
router.post("/:id", async (req, res) => {
  try {
    const dbFavoriteData = await Favorite.create({
      title: req.body.title,
      trailer_url: req.body.trailer_url,
      user_id: req.params.id,
    });
    res.status(200).json(dbFavoriteData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
