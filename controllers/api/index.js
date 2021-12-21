const router = require("express").Router();
const movieRoutes = require("./movie-routes");
const ratingRoutes = require("./rating-routes");
const userRoutes = require("./user-routes");

router.use("/movies", movieRoutes);
router.use("/ratings", ratingRoutes);
router.use("/users", userRoutes);

module.exports = router;
