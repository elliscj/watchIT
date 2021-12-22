const router = require("express").Router();
const { Movie, User, Rating } = require("../../models");
module.exports = router;

// ~~ /api/ratings ~~ //

// get all reviews ~~ sort by movie title

// get all reviews
router.get("/", async (req, res) => {
  try {
    const ratingData = await Rating.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(ratingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get reviews based on user

// add review

// update/edit a review

// delete review
