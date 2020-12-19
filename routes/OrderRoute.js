const express = require("express");
const router = express.Router();
// const request = require("request");
const axios = require("axios");

const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    if (order) res.status(200).json(order);
    else res.status(404).json({ message: "No orders available!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const order = new Order({
    _id: req.body._id,
    OrderNumber: req.body.OrderNumber,
    TshirtID: req.body.TshirtID,
    CustomerPhoneNumber: req.body.CustomerPhoneNumber,
  });

  try {
    let responseM;
    await axios({
      method: "patch",
      url: `http://localhost:3000/tshirt/${req.body.TshirtID}`,
      responseType: "json",
    }).then(function (response) {
      console.log(response.data.message);
      responseM = response.data.message;
    });
    let savedOrder;
    if (responseM === "Success!") savedOrder = await order.save();

    if (savedOrder) {
      res.status(201).json(savedOrder);
    } else {
      res.status(400).json({ message: "Order not succeed!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
