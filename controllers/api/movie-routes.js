const router = require("express").Router();
const { Movie, User, Rating } = require("../../models");

// get all movies ~~ should this be a movie api feature?

router.get("/", async (req, res) => {
  try {
    const movieData = await Movie.findAll({
      // include: [{ model: User }, { model: Rating }],
    });
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all movies user has stored

// get movies based on reviews? 1-5 stars?

//

module.exports = router;
