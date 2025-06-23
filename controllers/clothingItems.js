const clothingItem = require("../models/clothingItem");

const getClothing = (req, res) => {
  clothingItem
    .find({})
    .then((clothing) => res.status(200).send(clothing))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const postClothing = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteClothing = (req, res) => {
  const { clothingId } = req.params;
  clothingItem
    .findByIdAndDelete(clothingId)
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item" });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getClothing,
  postClothing,
  deleteClothing,
};
