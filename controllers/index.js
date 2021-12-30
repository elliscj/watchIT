// // const express = require("express");

const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// router.get("/", async (req, res, next) => {
//   try {
//     res.render("index");
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
// module.exports = router;
