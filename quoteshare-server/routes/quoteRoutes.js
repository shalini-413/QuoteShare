const express = require("express");
const Quote = require("../models/Quote");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const newQuote = new Quote({ text: req.body.text, user: req.userId });
  await newQuote.save();
  res.status(201).json(newQuote);
});

router.get("/", async (req, res) => {
  const quotes = await Quote.find().populate("user", "name");
  res.json(quotes);
});

router.patch("/:id/like", auth, async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) return res.status(404).json({ message: "Not found" });

  const userId = req.userId;
  const index = quote.likes.indexOf(userId);

  if (index > -1) {
    quote.likes.splice(index, 1); // Unlike
  } else {
    quote.likes.push(userId); // Like
  }

  await quote.save();
  res.json({ likes: quote.likes.length });
});

module.exports = router;
