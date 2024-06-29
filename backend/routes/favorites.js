const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Country = require("../models/Country");

const router = express.Router();

// Add to favorites
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const country = new Country(req.body);
    await country.save();
    user.favorites.push(country);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get favorites
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
