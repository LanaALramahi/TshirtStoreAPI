const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  _id: String,
  OrderNumber: Number,
  TshirtID: {
    type: String,
    required: true,
  },
  OrderDateTime: {
    type: Date,
    default: Date.now,
  },
  CustomerPhoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Orders", OrderSchema);
