const mongoose = require("mongoose");

const TShirtSchema = mongoose.Schema({
  _id: String,
  TshirtName: {
    type: String,
    required: true,
  },
  TshirtCategoryID: {
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

module.exports = mongoose.model("TShirts", TShirtSchema);
