const router = require("express").Router();
const { Favorie, User, Rating } = require("../../models");
module.exports = router;

// ~~ /api/users ~~ //

// get all users
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
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    // req.session.save(() => {
    //   req.session.loggedIn = true;

    //   res.status(200).json(dbUserData);
    // });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

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
