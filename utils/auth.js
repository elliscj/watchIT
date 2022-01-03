const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login-form");
  } else {
    next();
  }
};

module.exports = withAuth;
