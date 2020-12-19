const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
  _id: String,
  CategoryName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Categories", CategorySchema);
