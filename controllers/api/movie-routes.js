const router = require("express").Router();
const { Movie, User, Rating } = require("../../models");

// ~~ /api/movies ~~ //

// get all movies ~~ should this be a movie api feature?

router.get("/", async (req, res) => {
  try {
    const movieData = await Movie.findAll({
      include: [{ model: Rating }],
    });
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get (find all movies where user.movie_ids = movie.id)

// get all movies user has stored

// get movies based on reviews? 1-5 stars?

//

module.exports = router;
