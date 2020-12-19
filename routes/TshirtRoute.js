const express = require("express");
const router = express.Router();
const axios = require("axios");

const Tshirt = require("../models/TShirt");
const DisplayTShirt = require("../models/DisplayTshirtModel");

router.get("/", async (req, res) => {
  try {
    let categories;
    await axios({
      method: "get",
      url: "http://localhost:3000/category",
      responseType: "json",
    }).then(function (response) {
      // console.log(response);
      categories = response.data;
    });

    // console.log(categories);

    const tshirts = await Tshirt.find();
    let resultSet = [];
    let tshirt;
    if (tshirts && categories) {
      tshirts.map((t) => {
        categories.map((c) => {
          if (t.TshirtCategoryID === c._id) {
            try {
              tshirt = new DisplayTShirt({
                _id: t._id,
                TshirtName: t.TshirtName,
                TshirtCategoryName: c.CategoryName,
                TshirtPrice: t.TshirtPrice,
                NumberOfAvailableItems: t.NumberOfAvailableItems,
              });
              resultSet.push(tshirt);
            } catch (ex) {
              console.error(ex);
            }
            console.log(t.TshirtName, c.CategoryName);
          } else {
            console.log("No match");
          }
        });
      });
    }
    if (tshirts) res.status(200).json(resultSet);
    else res.status(404).json({ message: "No Items found!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tshirts = await Tshirt.findById(req.params.id);
    if (tshirts) res.status(200).json(tshirts);
    else res.status(404).json({ message: "Item not found!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const tshirt = new Tshirt({
    _id: req.body._id,
    TshirtName: req.body.TshirtName,
    TshirtCategoryID: req.body.TshirtCategoryID,
    TshirtPrice: req.body.TshirtPrice,
    NumberOfAvailableItems: req.body.NumberOfAvailableItems,
  });

  try {
    const savedTshirt = await tshirt.save();
    if (savedTshirt) res.status(201).json(savedTshirt);
    else
      res.status(400).json({
        message:
          "Unable to insert this item make sure that you entered all the details correctly!",
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.patch("/:tshirtId", async (req, res) => {
  try {
    console.log("entered patch method");

    var patchdata;
    await axios({
      method: "get",
      url: `http://localhost:3000/tshirt/${req.params.tshirtId}`,
      responseType: "json",
    }).then(function (response) {
      console.log(response.data.NumberOfAvailableItems);
      patchdata = response.data.NumberOfAvailableItems;
    });
    console.log("pd :: ", patchdata);
    var newAvailable;
    if (parseInt(patchdata) > 0) {
      newAvailable = parseInt(patchdata) - 1;
    } else {
      newAvailable = 0;
      res.status(200).json({ message: "No items available to order!" });
      return;
    }
    const updatedTshirt = await Tshirt.updateOne(
      { _id: req.params.tshirtId },
      {
        $set: {
          NumberOfAvailableItems: newAvailable,
        },
      }
    );

    res.status(201).json({ message: "Success!" });
    console.log(updatedTshirt);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
