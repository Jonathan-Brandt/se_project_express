const mongoose = require("mongoose");
const validator = require("validator");

const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("../utils/errors");

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.temId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res.status(NOT_FOUND).send({ message: "Resource not found" });
        } else if (err.name === "CastError") {
          return res.status(BAD_REQUEST).send({ message: "Invalid data" });
        }
        return res
          .status(DEFAULT)
          .send({ message: "An error has occurred on the server" });
      })
  );

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.temId,
    { $pull: { likes: req.user._id } },
    { new: true }
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
          return res.status(NOT_FOUND).send({ message: "Resource not found" });
        } else if (err.name === "CastError") {
          return res.status(BAD_REQUEST).send({ message: "Invalid data" });
        }
        return res
          .status(DEFAULT)
          .send({ message: "An error has occurred on the server" });
      })
  );

module.exports = {
  likeItem,
  dislikeItem,
};
