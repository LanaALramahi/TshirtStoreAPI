const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    if (category) res.status(200).json(category);
    else res.status(404).json({ message: "No categories found!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const category = new Category({
    _id: req.body._id,
    CategoryName: req.body.CategoryName,
  });

  try {
    const savedCategory = await category.save();
    if (savedCategory) res.status(201).json(savedCategory);
    else
      res.status(400).json({
        message:
          "Unable to insert this item make sure that you entered all the details correctly!",
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
