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
  clothingItem
    .create({ name, weather, imageUrl })
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
    .findById(clothingId)
    .orFail()
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getClothing,
  postClothing,
  deleteClothing,
};
