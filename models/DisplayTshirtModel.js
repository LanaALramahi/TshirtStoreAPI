const mongoose = require("mongoose");

const DisplayTShirtSchema = mongoose.Schema({
  _id: String,
  TshirtName: {
    type: String,
    required: true,
  },
  TshirtCategoryName: {
    type: String,
    required: true,
  },
  TshirtPrice: {
    type: Number,
    required: true,
  },
  NumberOfAvailableItems: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("DisplayTShirts", DisplayTShirtSchema);
