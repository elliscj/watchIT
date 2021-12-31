const router = require("express").Router();
const { Movie, User, Rating } = require("../../models");
module.exports = router;

// ~~ /api/users ~~ //

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Rating }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new user
// router.post("/", async (req, res) => {
//   try {
//     const dbUserData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// get all users (qty) (for admin purposes?)

// verify login? get password where Users.email = _____.

//-//-//-//-//~~~~~~~~ const { body } = require("express-validator");  ~~~~~~~~~~~~~~~~
// app.post(
//   "/user",
//   body("password").isLength({ min: 5 }),
//   body("passwordConfirmation").custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error("Password confirmation does not match password");
//     }

//     // Indicates the success of this synchronous custom validator
//     return true;
//   }),
//   (req, res) => {
//     // Handle the request
//   }
// );

// const { body } = require("express-validator");

// app.post(
//   "/user",
//   body("email").custom((value) => {
//     return User.findUserByEmail(value).then((user) => {
//       if (user) {
//         return Promise.reject("E-mail already in use");
//       }
//     });
//   }),
//   (req, res) => {
//     // Handle the request
//   }
// );
