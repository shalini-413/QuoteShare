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

  quotes.forEach(q => {
    console.log("Quote:", q.text, "| By:", q.user);
  });

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

// ✅ DELETE: Delete a quote (only by owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (quote.user.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not allowed to delete this quote" });
    }

    await quote.deleteOne();
    res.json({ message: "Quote deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
