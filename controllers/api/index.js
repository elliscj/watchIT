const router = require("express").Router();
const favoriteRoutes = require("./favorite-routes");
const ratingRoutes = require("./rating-routes");
const userRoutes = require("./user-routes");

router.use("/favorites", favoriteRoutes);
router.use("/ratings", ratingRoutes);
router.use("/users", userRoutes);

module.exports = router;
