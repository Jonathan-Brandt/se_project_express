const clothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  FORBIDDEN,
} = require("../utils/errors");

const getClothing = (req, res) => {
  clothingItem
    .find({})
    .then((clothing) => res.status(200).send(clothing))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const postClothing = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((createdItem) => res.status(201).send(createdItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteClothing = (req, res) => {
  const { _id } = req.user;
  const { clothingId } = req.params;
  clothingItem
    .findById(clothingId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== _id) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You are not allowed to access this data" });
      }

      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "Item deleted" }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getClothing,
  postClothing,
  deleteClothing,
};
