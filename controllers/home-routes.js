// serve up homepage

const router = require("express").Router();
// const { User } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/nowplaying", async (req, res) => {
  try {
    res.render("nowplaying");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/popular", async (req, res) => {
  try {
    res.render("popular");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/toprated", async (req, res) => {
  try {
    res.render("toprated");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    res.render("upcoming");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login-form", async (req, res) => {
  try {
    res.render("login-form");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
