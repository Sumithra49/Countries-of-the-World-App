const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Add to search history
router.post("/", auth, async (req, res) => {
  const { searchQuery } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.searchHistory = [
      searchQuery,
      ...user.searchHistory.filter((item) => item !== searchQuery),
    ].slice(0, 5);
    await user.save();
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get search history
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
