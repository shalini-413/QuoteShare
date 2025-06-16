const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/", auth, async (req, res) => {
  try {
    const newQuote = new Quote({ text: req.body.text, user: req.userId });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().populate("user", "name");
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
